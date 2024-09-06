import {createClient} from "@sanity/client";
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, } from '$env/static/public'
import type { Data } from '$lib/types';

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: "2023-09-05", // choose the API version you want
  useCdn: true,
});

export async function sanityLoad() {
  const data: Data = await client.fetch(`{
  "category": *[_type == "landing"],
  "post":  *[_type == "post"]{
  _id,
  _rev,
    _type,
  title,
  description,
  type,
  role,
  content,
  link,
  slug,
  year,
  tools,
  awards,
  "thumbnail": {
    "asset": thumbnail.asset->{
      _id,
      url,
      originalFilename,
      size
    }
  },
  _createdAt,
  _updatedAt
}
}`);
  console.log(data)
  if (data) return data

  return {
    status: 500,
    body: new Error("Internal Server Error")
  };
}
