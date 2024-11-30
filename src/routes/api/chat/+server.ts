import { error, json } from '@sveltejs/kit';
import OpenAI from 'openai';
import {
	OPENAI_API_KEY,
	OPENAI_ASSISTANT_ID,
	GMAIL_SEND,
	GMAIL_PASSWORD
} from '$env/static/private';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import * as nodemailer from 'nodemailer';
// import type { OpenAIError } from 'openai/error.mjs';

const rateLimiter = new RateLimiterMemory({
	points: 30,
	duration: 60
});

const client = new OpenAI({
	apiKey: OPENAI_API_KEY
});
const assistantID = OPENAI_ASSISTANT_ID;
// Initialize variables
let getThread:
	| (OpenAI.Beta.Threads.Thread & {
			_request_id?: string | null;
	  })
	| undefined;

// define mail SMTP server
const transporter = nodemailer.createTransport({
	port: 465,
	host: 'smtp.gmail.com',
	auth: {
		user: GMAIL_SEND,
		pass: GMAIL_PASSWORD
	},
	secure: true
});

// define mail data
const mailData = (name: string, contact: string, message: string) => {
	return {
		from: {
			name,
			address: GMAIL_SEND
		},
		to: GMAIL_SEND,
		subject: `New Message on jameshenry.site - ${name}`,
		text: `${message}\nPlease reach at: ${contact}`,
		html: `${message}<br>Please reach at: ${contact}`
	};
};

// main function
export async function POST(event) {
	const data = await event;
	// throw error(204, 'No Body Response');
	try {
		await rateLimiter.consume(data.userIP);
	} catch (err) {
		console.error(err);
		throw error(429, 'Too many requests, please try again later.');
		// return json(
		// 	{ success: false, message: 'Too many requests, please try again later.' },
		// 	{ status: 429 }
		// );
	}
	try {
		if (!data.request.body) throw error(204, 'No Body Response');
		const reader = data.request.body.getReader();
		let userInput;
		// Streaming the response
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const textChunk = new TextDecoder().decode(value);
			userInput = JSON.parse(textChunk).input;
		}
		if (!userInput) throw error(400, 'Error no user input');
		// Retrieve assistant details
		await retrieveAssistantDetails();

		// Step 1: Create a new thread
		getThread = await client.beta.threads.create();

		// Start the chat
		// Step 2: Get the user question and display it
		// Step 3: Add the user question to the thread messages
		// Step 4: Run the assistant and stream its answer
		await client.beta.threads.messages.create(getThread!.id, {
			role: 'user',
			content: userInput
		});

		const stream = await client.beta.threads.runs.create(getThread!.id, {
			assistant_id: assistantID,
			stream: true
		});

		let runId: string;
		const res = new ReadableStream({
			async start(controller) {
				for await (const part of stream) {
					if (part.event === 'thread.run.created') {
						runId = part.data.id;
					}
					if (part.event === 'thread.run.requires_action' && part.data.required_action) {
						const name = part.data.required_action.submit_tool_outputs.tool_calls[0].function.name;
						const args = JSON.parse(
							part.data.required_action.submit_tool_outputs.tool_calls[0].function.arguments
						);

						// Send message directly from server and report to client
						if (name === 'send_a_message') {
							console.log(mailData(args.name, args.contact_information, args.user_message), args);
							transporter.sendMail(
								mailData(args.name, args.contact_information, args.user_message),
								(err: Error | null) => {
									if (err) {
										console.error(err);
										errorHandling(error);
									}
								}
							);
						}
						// send function command to client
						controller.enqueue(`func_run ${name} ${JSON.stringify(args)} end_run`);

						// mock success from client
						const s = client.beta.threads.runs.submitToolOutputsStream(getThread!.id, runId, {
							tool_outputs: [
								{
									tool_call_id: part.data.required_action.submit_tool_outputs.tool_calls[0].id,
									output: 'success'
								}
							]
						});
						for await (const event of s) {
							if (event.event === 'thread.message.delta' && event.data.delta.content) {
								console.log(event.data.delta.content[0].text.value);
								controller.enqueue(event.data.delta.content[0].text.value);
							}
						}
					} else if (part.event === 'thread.message.delta' && part.data.delta.content) {
						controller.enqueue(part.data.delta.content[0].text.value);
					}
				}
				controller.close();
			}
		});

		return new Response(res, {
			status: 200,
			headers: {
				// Denotes the response as SSE
				'Content-Type': 'text/event-stream',
				Connection: 'keep-alive',
				'Cache-Control': 'no-cache'
			}
		});
	} catch (error) {
		errorHandling(error);
		return json({ success: false, message: 'Internal Server Error' }, { status: 500 });
	}
}

function errorHandling(err: unknown) {
	if (err instanceof OpenAI.APIError || (err && err.status && err.message)) {
		console.error(err.message);
		throw error(err.status as number, err.message);
	} else {
		console.error(500, err!.message);
	}
}
// Define an async function to retrieve assistant details
async function retrieveAssistantDetails() {
	try {
		// Retrieve assistant details
		const assistantDetails = await client.beta.assistants.retrieve(assistantID as string);

		// Get assistant name
		if (assistantDetails.name) {
			console.log(`using ${assistantDetails.name} assistant`);
		}

		// Get assistant instructions
		// if (assistantDetails.instructions) {
		// 	getInstructions = assistantDetails.instructions;
		// }

		// Get assistant LLM
		if (assistantDetails.model) {
			console.log(`Assistant Model: ${assistantDetails.model}`);
		}

		// Get assistant tools
		const allTools: string[] = [];

		if (assistantDetails.tools) {
			for (const tool of assistantDetails.tools) {
				if (tool) {
					allTools.push(tool.type);
				}
			}
		}
		if (allTools.length) console.log('Tools available: ' + allTools);
	} catch (error) {
		// Handle error when retrieving assistant details
		errorHandling(error);
	}
}
