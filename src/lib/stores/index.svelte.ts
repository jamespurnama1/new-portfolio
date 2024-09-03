import type { CMS } from '$lib/types'

let load = $state(0)
let loaded = $state(false)

export const loadStore = {
  get load() { return load },
  set load(newValue) {
    load = Math.abs(newValue)
  },
  get loaded() { return loaded },
  set loaded(val: boolean) { loaded = val }
}

const projects = $state({
  "1_highlights": [
        {
          "id": "650a593d1a7dbc957868b9d7",
          "slug": "reel",
          "title": "Reel",
          "content": "",
          "bucket": "63ebea30c1151e00086db96f",
          "created_at": "2021-04-09T09:19:00.625Z",
          "created_by": "63ebe9e626112600089ee664",
          "modified_at": "2022-06-06T10:12:57.174Z",
          "created": "2021-04-09T09:19:00.625Z",
          "status": "published",
          "thumbnail": "https://imgix.cosmicjs.com/e0551920-5a6a-11ed-ae4e-73ba99cb5e09-MUN-lite.001.jpeg",
          "published_at": "2022-06-06T10:12:57.174Z",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
            "thumbnail": {
        "url": "https://cdn.cosmicjs.com/11e5cb50-f603-11ec-a2eb-c1653f3f9199-reel.webm",
        "imgix_url": "https://cdn.cosmicjs.com/11e5cb50-f603-11ec-a2eb-c1653f3f9199-reel.webm"
      },
            "colors": [
              {
                "r": 0.3,
                "g": 0.3,
                "b": 0.3
              },
              {
                "r": 0.7,
                "g": 0.7,
                "b": 0.7
              }
            ],
            "theme": null,
            "description": "2022 Video Reel",
            "tools": null,
            "type": "Woks in 2022",
            "year": null,
            "external": null,
            "role": null
          }
        },
        {
          "id": "661374198eeb799dd185de93",
          "slug": "yellow-canteen",
          "title": "Yellow Canteen",
          "content": "<div class=\"section\"><h3>Progress</h3><span class=\"fr-video fr-dvb fr-draggable\" draggable=\"true\"><video class=\"fr-draggable fr-fvc fr-dvi\" controls=\"\" src=\"https://cdn.cosmicjs.com/0a6e1930-db69-11ed-9081-afb8d99da5f0-DIRCUT---HYUNDAI.mp4\">Your browser does not support HTML5 video.</video></span></div><div class=\"section\"><h3>Logo</h3><p><span class=\"fr-video fr-dvb fr-draggable\" draggable=\"true\"><video class=\"fr-draggable fr-fvc fr-dvi\" controls=\"\" src=\"https://cdn.cosmicjs.com/6448e020-db69-11ed-9081-afb8d99da5f0-CRETA-Dynamic-Black-Edition--Berani-dan-Penuh-Sensasi-with-Tamara-Dai.mp4\">Your browser does not support HTML5 video.</video></span></p></div><div class=\"section\"><h3 id=\"isPasted\">Supergraphics</h3><img src=\"https://cdn.cosmicjs.com/be800700-dbad-11ed-b6eb-0fc980522195-Dominate.png\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Colors</h3><div class=\"grid\"><img src=\"https://cdn.cosmicjs.com/9f258ed0-dbac-11ed-b6eb-0fc980522195-332330393119127151099143199731880139564060n.jpg\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Tone / Mood</h3><img src=\"https://cdn.cosmicjs.com/d76e5230-dbad-11ed-b6eb-0fc980522195-3323625047357038849253275302583466967106252n.jpg\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Social Media</h3><img src=\"https://cdn.cosmicjs.com/debeba20-dbad-11ed-b6eb-0fc980522195-33293376159792240221306326842596486046215494n.jpg\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Posters</h3><img src=\"https://cdn.cosmicjs.com/e2506c60-dbad-11ed-b6eb-0fc980522195-33301508119821113055141335115794575428074120n.jpg\" class=\"fr-fic fr-dib\" data-pin-me-only=\"true\"></div></div><div class=\"section\"><h3>Website</h3><img src=\"https://cdn.cosmicjs.com/8e6a73a0-db6e-11ed-9081-afb8d99da5f0-Adversiment-Billboard-mockup-vol4.jpg\" class=\"fr-fic fr-dib\"></div>",
          "bucket": "63ebea30c1151e00086db96f",
          "created_at": "2024-04-08T04:35:37.267Z",
          "modified_at": "2024-09-03T04:03:25.670Z",
          "status": "published",
          "modified_by": "63ebe9e626112600089ee664",
          "created_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "thumbnail": "https://imgix.cosmicjs.com/14afed70-68e8-11ef-a492-5bdc7520fe60-thumb.jpg",
          "created": "2024-04-08T04:35:37.267Z",
          "published_at": "2024-09-03T04:03:25.670Z",
          "type": "posts",
          "metadata": {
  "thumbnail": {
        "url": "https://cdn.cosmicjs.com/115c7140-69db-11ef-a492-5bdc7520fe60-cut.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/115c7140-69db-11ef-a492-5bdc7520fe60-cut.mp4"
      },
            "awards": {
              "DandAD": {
                "Gold": "Yellow Pencil in Spatial Design",
                "Silver": [
                  "Graphite Pencil in Impact",
                  "Graphite Pencil in Spatial Design"
                ]
              },
              "AdFest": {
                "Silver": [
                  "Silver in Sustainable: Health & Well-being",
                  "Silver in Sustainable Environment"
                ],
                "Bronze": "Bronze in Media - Use of Ambient: Large Scale"
              },
              "Spikes Asia": {
                "Silver": "Silver in Media",
                "Bronze": "Bronze in Healthcare"
              },
              "The One Show": {
                "Bronze": "Bronze in Experiential & Immersive"
              },
              "MAD STARS": {
                "Gold": "Gold in Brand Experience & Activation",
                "Silver": [
                  "Silver in Design",
                  "Silver in Direct",
                  "Silver in Media",
                  "Silver in Outdoor"
                ]
              }
            },
            "theme": "dark",
            "description": "ARC’TERYX: Cambrian is a new clothing line paleontology & archeology concept. This Spring/Summer collection consists of high-quality outdoor clothing and climbing gear products.",
            "tools": "Blender, Illustrator, Photoshop",
            "type": "Freelance",
            "year": 2024,
            "external": null,
            "role": "Publication Designer, Motion Graphics Designer, Art Director, Digital Designer"
          }
        }
      ],
      "2_website": [
        {
          "id": "650a593d1a7dbc957868b9da",
          "bucket": "63ebea30c1151e00086db96f",
          "slug": "munlite",
          "title": "MUNlite",
          "content": "<div class=\"section\"><h3>exploration</h3><img src=\"https://cdn.cosmicjs.com/3f01e690-f77b-11ec-8f84-3f01a4a22fe2-Group-6450.png?auto=format&q=90\" data-name=\"Asset 41@2x-100.jpg\" class=\"fr-fic fr-dii\" alt=\"MUNlite logo exploration\"></div><div class=\"section\"><h3>logo</h3><img src=\"https://cdn.cosmicjs.com/4a3e2eb0-f77b-11ec-8f84-3f01a4a22fe2-Group-6451.png?auto=format&q=90\" data-name=\"Asset 43@2x-100.jpg\" class=\"fr-fic fr-dii\" alt=\"MUNlite primary logo on white, primary logo on color background, & secondary logo\"></div><div class=\"section\"><h3>typeface &amp; color</h3><div class=\"flex section\"><img src=\"https://cdn.cosmicjs.com/53670020-f77b-11ec-8f84-3f01a4a22fe2-Group-300.png?auto=format&q=90\" data-name=\"Asset 44@2x.png\" class=\"fr-fic fr-dii\" alt=\"MUNlite typeface\">\r\n<img src=\"https://cdn.cosmicjs.com/593e0e80-f77b-11ec-8f84-3f01a4a22fe2-Group-400.png?auto=format&q=90\" class=\"fr-fic fr-dib\" alt=\"MUNlite color palette\"></div></div><div class=\"section\"><h3>supergraphics</h3><div class=\"flex\" style=\"gap: 10vw;\"><div><img src=\"https://cdn.cosmicjs.com/975c9d30-f77b-11ec-8f84-3f01a4a22fe2-Asset-32x.png?auto=format&q=90\" class=\"margin fr-fic fr-dii\" alt=\"Blue double circle supergraphic\">\r\n<img src=\"https://cdn.cosmicjs.com/9be3fa10-f77b-11ec-8f84-3f01a4a22fe2-Asset-42x.png?auto=format&q=90\" data-name=\"Asset 46@2x.png\" class=\"fr-fic fr-dii\" alt=\"Blue square circle supergraphic\"></div><div><img src=\"https://cdn.cosmicjs.com/9fd99e40-f77b-11ec-8f84-3f01a4a22fe2-Asset-22x.png?auto=format&q=90\" data-name=\"Asset 47@2x.png\" class=\"margin fr-fic fr-dii\" alt=\"Red triangle circle supergraphic\"><p>Completing the MUN theme, these supergraphics use basic shapes to convey engagement and discourse. These illustrations also help to convey unwanted actions with color and sharp edges or to re-affirm the user with soft round edges and soothing colors.</p></div></div></div><div class=\"section flex\" style=\"align-items: start;\"><div><h3>fab</h3><div class=\"grid oneThird\"><img src=\"https://cdn.cosmicjs.com/a75709a0-f77b-11ec-8f84-3f01a4a22fe2-Group-253.png?auto=format&q=90\" data-name=\"Asset 48@2x-100.jpg\" class=\"fr-fic fr-dii\" alt=\"Floating Action Button\"><p>The floating action button will always be on the edge of an element. Floating higher than the element underneath.</p><img src=\"https://cdn.cosmicjs.com/abe6f200-f77b-11ec-8f84-3f01a4a22fe2-Group-287.png?auto=format&q=90\" class=\"fr-fic fr-dib\" alt=\"Floating Action Button needs attention\"><p>If a FAB is causing possible major disruption, highlight the edges with a glow to indicate to the user what is going on.</p><img src=\"https://cdn.cosmicjs.com/af405630-f77b-11ec-8f84-3f01a4a22fe2-Group-263.png?auto=format&q=90\" class=\"fr-fic fr-dib\" alt=\"Floating Action Button on hover\"><p>On hover, scale and reduce drop shadow opacity to simulate a larger z-index.</p></div></div><div><h3>buttons</h3><img src=\"https://cdn.cosmicjs.com/be25a920-f77b-11ec-8f84-3f01a4a22fe2-Group-6456.png?auto=format&q=90\" data-name=\"Asset 49@2x-100.jpg\" class=\"fr-fic fr-dii\" alt=\"All button states\"></div></div><div class=\"section\"><h3>inputs</h3><img src=\"https://cdn.cosmicjs.com/c2534d40-f77b-11ec-8f84-3f01a4a22fe2-Group-6457.png?auto=format&q=90\" data-name=\"Asset 50@2x-100.jpg\" class=\"fr-fic fr-dii\" alt=\"Text box input and toggle states\"></div><div class=\"flex section\" style=\"align-items: start;\"><div><h3>choices</h3><img src=\"https://cdn.cosmicjs.com/a3a81f80-f788-11ec-8f84-3f01a4a22fe2-Group-243.png?auto=format&q=90\" class=\"fr-fic fr-dii\" alt=\"Choice selection and custom text choice box\"></div><div><h3>components</h3><img src=\"https://cdn.cosmicjs.com/a8002f00-f788-11ec-8f84-3f01a4a22fe2-Group-401.png?auto=format&q=90\" class=\"fr-fic fr-dii\" alt=\"Interactive and informative components\"></div></div><div class=\"section\"><h3>contextual menu</h3><img src=\"https://cdn.cosmicjs.com/ac7e1600-f788-11ec-8f84-3f01a4a22fe2-Group-317.png?auto=format&q=90\" class=\"fr-fic fr-dii\" alt=\"Contextual menu with keyboard shortcuts\"></div><div class=\"section\"><h3>commercial page</h3><img src=\"https://cdn.cosmicjs.com/2f430d20-8899-11ec-9eec-e3ad41451efc-Commercial.jpg?auto=format&q=90\" class=\"fr-fic fr-dii\"></div>",
          "created": "2018-01-05T16:01:22.020Z",
          "created_at": "2018-01-05T16:01:22.020Z",
          "modified_at": "2022-11-02T04:57:56.427Z",
          "status": "published",
          "published_at": "2022-11-02T04:57:56.427Z",
          "thumbnail": "https://imgix.cosmicjs.com/e0551920-5a6a-11ed-ae4e-73ba99cb5e09-MUN-lite.001.jpeg",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "created_by": "63ebe9e626112600089ee664",
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
 "thumbnail": {
        "url": "https://cdn.cosmicjs.com/2145f5c0-8835-11ec-9eec-e3ad41451efc-Commercial-Test.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/2145f5c0-8835-11ec-9eec-e3ad41451efc-Commercial-Test.mp4"
      },
            "colors": [
              {
                "r": 0.373,
                "g": 0.471,
                "b": 1
              },
              {
                "r": 1,
                "g": 0.373,
                "b": 0.373
              }
            ],
            "theme": "light",
            "description": "MUNlite is a solution to every delegates, chairs, and education institutions during the pandemic. It allows MUN conferences to happen remotely no matter where the delegates & chairs are. This web app is driven to simplify and visualize even on site conference for better MUN experience. This project is made with Vue.js through REST API and WebSocket technology hosted on Vercel. While its backend is hosted on GCP made with GO and MongoDB for its database. MUNlite is also integrated with continuous integration and Cypress as its end-to-end testing.",
            "tools": "Vue.js, Adobe XD, Adobe Illustrator, Adobe After Effects, Cinema4D",
            "type": "Freelance",
            "year": 2020,
            "external": "https://munlite-frontend-tau.vercel.app/",
            "role": "Brand Designer, UI/UX Designer, Frontend Developer, Motion Designer"
          }
        },
        {
          "id": "650a593d1a7dbc957868b9db",
          "bucket": "63ebea30c1151e00086db96f",
          "slug": "lakra",
          "title": "Lakra",
          "content": "<div class=\"section\"><p>We bring professional architects, contractors, and related consultants to ensure the quality and comfort of housing for clients. At Lakra, we believe shelter is fundamental to human growth as individuals; comfortable and quality housing, stimulate\r\ngood value in the process of individual development.</p></div><div class=\"section\"><h3>logo</h3><div class=\"flex\"><img src=\"https://imgix.cosmicjs.com/b70d8a30-8828-11ec-9eec-e3ad41451efc-Asset-202x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 20@2x.png\" class=\"fr-fic fr-dii\"><p>Lakra&rsquo;s logo was taken from the silhouette of L, which has been rotated and unified into a form of a 45&deg; angled box, which signifies unity and order. The 4 edges of the box are softened with the presence of circular elements on each edge. This\r\ngraphic logo represents Lakra as corporate identity, and won&rsquo;t be used in the housing area of each Lakra(s). Lakra&rsquo;s logotype represents minimalism and elegance. The logo uses wider spacing to create more negative spaces and\r\ncurved edges to show attention to detail.</p></div><img src=\"https://imgix.cosmicjs.com/019f8170-8829-11ec-9eec-e3ad41451efc-Asset-212x.png??auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 21@2x.png\" class=\"fr-fic fr-dii\">\r\n<img src=\"https://imgix.cosmicjs.com/01a092e0-8829-11ec-9eec-e3ad41451efc-Asset-222x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 22@2x.png\" class=\"fr-fic fr-dii\"></div><div class=\"section\"><h3>typography</h3><div class=\"grid section\"><img src=\"https://imgix.cosmicjs.com/013f11f0-8829-11ec-9eec-e3ad41451efc-Asset-232x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 23@2x.png\" class=\"fr-fic fr-dib\"><p>Our typeface is simple and universal, it allows us to communicate clearly and truthfully. For main texts and titles, we use Helvetica Neue Light, Helvetica Neue Medium for the header, and another Helvetica Neue Light for body texts.</p></div></div><div class=\"section\"><h3>color</h3><div class=\"grid section\"><p>Lakra&rsquo;s color should be earthy and natural. Thus the different colors of green and monochrome shades for contrast.</p><img src=\"https://imgix.cosmicjs.com/01a01db0-8829-11ec-9eec-e3ad41451efc-Asset-242x-100.jpg?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 24@2x-100.jpg\" class=\"fr-fic fr-dii\"></div></div><div class=\"section\"><h3>illustrations</h3><img src=\"https://imgix.cosmicjs.com/01c224a0-8829-11ec-9eec-e3ad41451efc-Asset-252x-100.jpg?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 25@2x-100.jpg\" class=\"fr-fic fr-dii\"></div><div class=\"section\"><h3>video reel</h3><span class=\"fr-video fr-fvc fr-dvi fr-draggable\" contenteditable=\"false\"><video class=\"fr-fvc fr-dvi fr-draggable\" controls=\"\" playsinline=\"\" src=\"https://cdn.cosmicjs.com/5690df40-8832-11ec-9eec-e3ad41451efc-Reel-Web.mp4\">Your browser does not support HTML5 video.</video></span></div><div class=\"section\"><h3>social media</h3><img src=\"https://imgix.cosmicjs.com/03955e00-8829-11ec-9eec-e3ad41451efc-Asset-262x-100.jpg?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 26@2x-100.jpg\" class=\"fr-fic fr-dib\"></div><div class=\"section\"><h3>website</h3><span class=\"fr-video fr-fvc fr-dvi fr-draggable\" contenteditable=\"false\"><video autoplay=\"\" class=\"fr-fvc fr-dvi fr-draggable\" controls=\"false\" loop=\"\" muted=\"\" playsinline=\"\" src=\"https://cdn.cosmicjs.com/7f065050-88ae-11ec-9eec-e3ad41451efc-scroll-anim.mp4\">Your browser does not support HTML5 video.</video></span>\r\n<span class=\"fr-video fr-fvc fr-dvi fr-draggable\" contenteditable=\"false\"><video autoplay=\"\" class=\"fr-fvc fr-dvi fr-draggable\" controls=\"false\" loop=\"\" muted=\"\" playsinline=\"\" src=\"https://cdn.cosmicjs.com/76774de0-88ae-11ec-9eec-e3ad41451efc-location.mp4\">Your browser does not support HTML5 video.</video></span><div class=\"flex twoThirds\"><img src=\"https://imgix.cosmicjs.com/03d9e110-8829-11ec-9eec-e3ad41451efc-Asset-272x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 27@2x.png\" class=\"fr-fic fr-dii\">\r\n<img src=\"https://imgix.cosmicjs.com/01e5b230-8829-11ec-9eec-e3ad41451efc-Asset-282x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 28@2x.png\" class=\"fr-fic fr-dii\"></div><div class=\"flex twoThirds\"><img src=\"https://imgix.cosmicjs.com/03d7be30-8829-11ec-9eec-e3ad41451efc-Asset-292x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 29@2x.png\" class=\"fr-fic fr-dii\">\r\n<img src=\"https://imgix.cosmicjs.com/02056f30-8829-11ec-9eec-e3ad41451efc-Asset-302x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 30@2x.png\" class=\"fr-fic fr-dii\"></div><div class=\"flex twoThirds\"><img src=\"https://imgix.cosmicjs.com/01e2a4f0-8829-11ec-9eec-e3ad41451efc-Asset-312x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 31@2x.png\" class=\"fr-fic fr-dii\">\r\n<img src=\"https://imgix.cosmicjs.com/01c5ce20-8829-11ec-9eec-e3ad41451efc-Asset-322x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 32@2x.png\" class=\"fr-fic fr-dii\"></div><div class=\"flex\"><img src=\"https://imgix.cosmicjs.com/03b7b310-8829-11ec-9eec-e3ad41451efc-Asset-342x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 34@2x.png\" class=\"fr-fic fr-dii\">\r\n<img src=\"https://imgix.cosmicjs.com/01e67580-8829-11ec-9eec-e3ad41451efc-Asset-352x.png?auto=format&q=90\" data-folder=\"lakra-content\" data-name=\"Asset 35@2x.png\" class=\"fr-fic fr-dii\"></div></div>",
          "created": "2018-01-05T16:01:22.018Z",
          "created_at": "2018-01-05T16:01:22.018Z",
          "modified_at": "2022-07-17T17:40:16.529Z",
          "status": "published",
          "published_at": "2022-07-17T17:40:16.529Z",
          "thumbnail": "https://imgix.cosmicjs.com/d9e4ddc0-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-4-80.jpg",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "created_by": "63ebe9e626112600089ee664",
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/5690df40-8832-11ec-9eec-e3ad41451efc-Reel-Web.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/5690df40-8832-11ec-9eec-e3ad41451efc-Reel-Web.mp4"
      },
            "colors": [
              {
                "r": 0.502,
                "g": 0.529,
                "b": 0.435
              },
              {
                "r": 0.439,
                "g": 0.447,
                "b": 0.404
              }
            ],
            "theme": "light",
            "description": "Lakra is a property developer company based in Jakarta, Lakra provides innovative and quality premium housing for clients. Client is our priority in all aspects of development. Build home, build values. This project involves a 3-man team each contributing in branding, marketing, social media planning, UI/UX, and web development.",
            "tools": "Vue.js, Adobe After Effects, Adobe Illustrator, Adobe XD, Adobe Photoshop",
            "type": "Freelance",
            "year": 2020,
            "external": "https://lakra.id",
            "role": "UI/UX Designer, Frontend Developer, Brand Designer, Social Media Manager"
          }
        },
        {
          "id": "650a593d1a7dbc957868b9dd",
          "bucket": "63ebea30c1151e00086db96f",
          "slug": "creaid",
          "title": "Creaid",
          "content": "<div class=\"section\" style=\"grid-column-gap: 5em;\"><h3>logo</h3><div class=\"grid\"><img src=\"https://cdn.cosmicjs.com/646de1b0-81d6-11ec-baf6-a92bbf578f33-Group-405.png?auto=format&q=90\" class=\"fr-fic fr-dib\"><p>CREAID&rsquo;s logo is, of course, medical-related. The logo is inspired by the Star of Life, a six-pointed star with the Rod of Asclepius. The rod is replaced with a pencil to more tightly represent the creators as an aid in these rough times.</p></div></div><div class=\"section\"><h3>posters</h3><div class=\"grid\"><img src=\"https://cdn.cosmicjs.com/07316b80-37cf-11ec-8830-1bb37ab63cd9-2.jpg?auto=format&q=90\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/0b741e40-37cf-11ec-8830-1bb37ab63cd9-3.jpg?auto=format&q=90\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/f053d7e0-37ce-11ec-8830-1bb37ab63cd9-0.jpg?auto=format&q=90\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/0475cdf0-37cf-11ec-8830-1bb37ab63cd9-1.jpg?auto=format&q=90\" class=\"fr-fic fr-dib\"></div></div><div class=\"section\"><h3>website</h3><img src=\"https://cdn.cosmicjs.com/713bf4c0-81d3-11ec-baf6-a92bbf578f33-Group-6432.jpg?auto=format&q=90\" class=\"fr-dib\"></div><div class=\"section\"><h3>loading page</h3><span class=\"fr-video fr-fvc fr-dvi fr-draggable\" contenteditable=\"false\"><video autoplay=\"true\" class=\"fr-draggable fr-fvc fr-dvi\" controls=\"hidden\" loop=\"true\" muted=\"true\" playsinline=\"true\" src=\"https://cdn.cosmicjs.com/1217a780-81d5-11ec-baf6-a92bbf578f33-loading.mp4\">Your browser does not support HTML5 video.</video></span></div>",
          "created": "2018-01-05T16:01:22.011Z",
          "created_at": "2018-01-05T16:01:22.011Z",
          "modified_at": "2022-07-01T09:25:54.299Z",
          "status": "published",
          "published_at": "2022-07-01T09:25:54.299Z",
          "thumbnail": "https://imgix.cosmicjs.com/cb401640-f91f-11ec-b2b1-473235369c53-Artboard-1-copy-80.jpg",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "created_by": "63ebe9e626112600089ee664",
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/1217a780-81d5-11ec-baf6-a92bbf578f33-loading.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/1217a780-81d5-11ec-baf6-a92bbf578f33-loading.mp4"
      },
            "colors": [
              {
                "r": 0.925,
                "g": 0.125,
                "b": 0.149
              },
              {
                "r": 0.929,
                "g": 0.388,
                "b": 0.176
              }
            ],
            "theme": "light",
            "description": "CREAID is a class-wide graduation project to promote ourselves to employers and other creatives. The concept is to bring creative cure during the pandemic where graphic designers can be really useful to bring digital presence where it’s needed.",
            "tools": "Vue.js, Adobe XD, Adobe Illustrator",
            "type": "The One Academy College Project",
            "year": 2020,
            "external": "https://graduation.vercel.app",
            "role": "UI/UX Designer, Frontend Developer"
          }
        }
      ],
      "3_design": [
        {
          "id": "65f40e89ce397967fe940a5d",
          "slug": "arcteryx",
          "title": "ARC’TERYX",
          "content": "<div class=\"section\"><h3>Progress</h3><span class=\"fr-video fr-dvb fr-draggable\" draggable=\"true\"><video class=\"fr-draggable fr-fvc fr-dvi\" controls=\"\" src=\"https://cdn.cosmicjs.com/0a6e1930-db69-11ed-9081-afb8d99da5f0-DIRCUT---HYUNDAI.mp4\">Your browser does not support HTML5 video.</video></span></div><div class=\"section\"><h3>Logo</h3><p><span class=\"fr-video fr-dvb fr-draggable\" draggable=\"true\"><video class=\"fr-draggable fr-fvc fr-dvi\" controls=\"\" src=\"https://cdn.cosmicjs.com/6448e020-db69-11ed-9081-afb8d99da5f0-CRETA-Dynamic-Black-Edition--Berani-dan-Penuh-Sensasi-with-Tamara-Dai.mp4\">Your browser does not support HTML5 video.</video></span></p></div><div class=\"section\"><h3 id=\"isPasted\">Supergraphics</h3><img src=\"https://cdn.cosmicjs.com/be800700-dbad-11ed-b6eb-0fc980522195-Dominate.png\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Colors</h3><div class=\"grid\"><img src=\"https://cdn.cosmicjs.com/9f258ed0-dbac-11ed-b6eb-0fc980522195-332330393119127151099143199731880139564060n.jpg\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Tone / Mood</h3><img src=\"https://cdn.cosmicjs.com/d76e5230-dbad-11ed-b6eb-0fc980522195-3323625047357038849253275302583466967106252n.jpg\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Social Media</h3><img src=\"https://cdn.cosmicjs.com/debeba20-dbad-11ed-b6eb-0fc980522195-33293376159792240221306326842596486046215494n.jpg\" class=\"fr-fic fr-dib\"><h3 id=\"isPasted\">Posters</h3><img src=\"https://cdn.cosmicjs.com/e2506c60-dbad-11ed-b6eb-0fc980522195-33301508119821113055141335115794575428074120n.jpg\" class=\"fr-fic fr-dib\" data-pin-me-only=\"true\"></div></div><div class=\"section\"><h3>Website</h3><img src=\"https://cdn.cosmicjs.com/8e6a73a0-db6e-11ed-9081-afb8d99da5f0-Adversiment-Billboard-mockup-vol4.jpg\" class=\"fr-fic fr-dib\"></div>",
          "bucket": "63ebea30c1151e00086db96f",
          "created_at": "2024-03-15T09:02:01.243Z",
          "modified_at": "2024-09-03T03:34:23.419Z",
          "status": "published",
          "published_at": "2024-09-03T03:34:23.419Z",
          "modified_by": "63ebe9e626112600089ee664",
          "created_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "thumbnail": "https://imgix.cosmicjs.com/780beff0-e2aa-11ee-b074-b5c8fe3ef189-Main.png",
          "type": "posts",
          "metadata": {
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/60a75cb0-69db-11ef-a492-5bdc7520fe60-anim2.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/60a75cb0-69db-11ef-a492-5bdc7520fe60-anim2.mp4"
      },
            "awards": null,
            "theme": "dark",
            "description": "ARC’TERYX: Cambrian is a new clothing line paleontology & archeology concept. This Spring/Summer collection consists of high-quality outdoor clothing and climbing gear products.",
            "tools": "Blender, Illustrator, Photoshop",
            "type": "Freelance",
            "year": 2023,
            "external": null,
            "role": "Brand Designer, Motion Graphics Designer"
          }
        },
        {
          "id": "650a593c1a7dbc957868b9d6",
          "slug": "tremors",
          "title": "Tremors",
          "content": "<div class=\"flex section\"><img src=\"https://imgix.cosmicjs.com/418cb9d0-8822-11ec-9eec-e3ad41451efc-Asset-12x-100.jpg?auto=format&q=90\" data-folder=\"tremors-content\" data-name=\"Asset 1@2x-100.jpg\" class=\"fr-fic fr-dib\"><div><h3>contrast</h3><p>Crucial to the final look, it&#39;s important to adjust and block unnecessary lighting during the photoshoot. However, subtle details in the shadow areas must still show to maintain the structure of the facial expression.</p></div></div><div class=\"flex section\"><div><h3>colors</h3><p>The next step is to adjust the light colors for a split tone, and left-right color difference. Each individual color range can be shifted to match the look and feel desired.</p></div><img src=\"https://cdn.cosmicjs.com/ea683c40-f84e-11ec-b2b1-473235369c53-Asset-22x-100.jpg?auto=format&q=90\" data-name=\"Asset 2@2x-100.jpg\" class=\"fr-fic fr-dib\"></div><div class=\"flex section\"><img src=\"https://imgix.cosmicjs.com/41ad3a20-8822-11ec-9eec-e3ad41451efc-Asset-32x.png?auto=format&q=90\" data-folder=\"tremors-content\" data-name=\"Asset 3@2x.png\" class=\"fr-fic fr-dib\"><div><h3>layering</h3><p>In several photos, it is important to layer several shots on top of each other. This technique shows movement and sometimes subtle twitches. Adding to the already intense facial expression and convincing the audience of the tremors in each subject.</p></div></div><div class=\"section\"><h3>progress</h3><img src=\"https://cdn.cosmicjs.com/03537a30-f84f-11ec-b2b1-473235369c53-Asset-42x-100.jpg?auto=format&q=90\" data-name=\"Asset 4@2x-100.jpg\" class=\"fr-fic fr-dib\"><p>untouched - contrast - touch up - final</p></div><div class=\"section\"><h3>melancholia</h3><div class=\"grid oneThird\" style=\"grid-template-columns: 0.31fr 0.7fr;\"><img src=\"https://cdn.cosmicjs.com/0fed2f70-f84f-11ec-b2b1-473235369c53-Asset-52x-100.jpg?auto=format&q=90\" data-name=\"Asset 5@2x-100.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/21f8a190-f84f-11ec-b2b1-473235369c53-Asset-62x-100.jpg?auto=format&q=90\" data-name=\"Asset 6@2x-100.jpg\" class=\"fr-fic fr-dib\"></div></div><div class=\"section\"><h3>catatonia</h3><div class=\"grid\" style=\"grid-template-columns: 1fr 0.7fr;\"><img src=\"https://cdn.cosmicjs.com/2cd9aa50-f84f-11ec-b2b1-473235369c53-Asset-72x-100.jpg?auto=format&q=90\" data-name=\"Asset 7@2x-100.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/34f02160-f84f-11ec-b2b1-473235369c53-Asset-92x-100.jpg?auto=format&q=90\" data-name=\"Asset 9@2x-100.jpg\" class=\"long fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/3f8776f0-f84f-11ec-b2b1-473235369c53-Asset-82x-100.jpg?auto=format&q=90\" data-name=\"Asset 8@2x-100.jpg\" class=\"fr-fic fr-dib\"></div></div><div class=\"section\"><h3>cyclothymia</h3><div class=\"grid\" style=\"grid-template-columns: 1fr 1fr 1.15fr;\"><img src=\"https://cdn.cosmicjs.com/45b5a600-f84f-11ec-b2b1-473235369c53-Asset-102x-100.jpg?auto=format&q=90\" data-name=\"Asset 10@2x-100.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/4be5a9d0-f84f-11ec-b2b1-473235369c53-Asset-112x-100.jpg?auto=format&q=90\" data-name=\"Asset 11@2x-100.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/51fef150-f84f-11ec-b2b1-473235369c53-Asset-122x-100.jpg?auto=format&q=90\" data-name=\"Asset 12@2x-100.jpg\" class=\"fr-fic fr-dib\"></div></div><div class=\"section\"><h3>dysthymia</h3><div class=\"grid\"><img src=\"https://cdn.cosmicjs.com/594435b0-f84f-11ec-b2b1-473235369c53-Asset-132x-100.jpg?auto=format&q=90\" data-name=\"Asset 13@2x-100.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/6796e590-f84f-11ec-b2b1-473235369c53-Asset-142x-100.jpg?auto=format&q=90\" data-name=\"Asset 14@2x-100.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://cdn.cosmicjs.com/6e84bb20-f84f-11ec-b2b1-473235369c53-Asset-152x-100.jpg?auto=format&q=90\" data-name=\"Asset 15@2x-100.jpg\" class=\"fr-fic fr-dib\" style=\"grid-column: 1 / span 2;\"></div></div>",
          "bucket": "63ebea30c1151e00086db96f",
          "created_at": "2021-04-16T10:23:15.149Z",
          "created_by": "63ebe9e626112600089ee664",
          "modified_at": "2022-07-01T09:29:12.458Z",
          "created": "2021-04-16T10:23:15.149Z",
          "status": "published",
          "thumbnail": "https://imgix.cosmicjs.com/42563b60-f920-11ec-b2b1-473235369c53-Artboard-1-copy-3-80.jpg",
          "published_at": "2022-07-01T09:29:12.458Z",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/78078910-8825-11ec-9eec-e3ad41451efc-tremors.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/78078910-8825-11ec-9eec-e3ad41451efc-tremors.mp4"
      },
            "colors": [
              {
                "r": 0.094,
                "g": 0.0419,
                "b": 0.851
              },
              {
                "r": 0.659,
                "g": 0.306,
                "b": 0.831
              }
            ],
            "theme": "dark",
            "description": "Tremors mean an involuntary quivering movement. It’s also known as an expression of an unbecoming. This conceptual photography is a project that features double exposure and strong vibrant colors depicting a condition such as dysthymia, cyclothymia, melancholia, and catatonia.",
            "tools": "Adobe Photoshop, Adobe Lightroom",
            "type": "The One Academy College Project",
            "year": 2018,
            "external": null,
            "role": "Photographer, Art Director"
          }
        },
        {
          "id": "650a593d1a7dbc957868b9d9",
          "bucket": "63ebea30c1151e00086db96f",
          "slug": "jtc",
          "title": "Jack The Clipper",
          "content": "<div class=\"flex section\"><div><h3>brand analysis</h3><p>Jack The Clipper first opened in 2018 in Wisma Central, KLCC. They were brothers making a living in something they are passionate about, hairstyling. They remained true to their market and style to this day. They were inspired by Jack The Ripper thus\r\nthe unique name &lsquo;Jack The Clipper.&rsquo;</p></div><div><h3>target audience</h3><p>A focused target audience is needed to efficiently market the service to the audience. Currently, Jack The Clipper is focused on male Indian barbers ranging from teenagers to office workers. The identity is designed for audiences who know who Jack The\r\nRipper is as well as the aesthetics of the era.</p></div></div><div class=\"section\"><h3>logo</h3><p><img src=\"https://imgix.cosmicjs.com/692a7110-88b5-11ec-9eec-e3ad41451efc-Asset-142x.png?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Asset 14@2x.png\" class=\"fr-fic fr-dib\"></p></div><div class=\"section\"><h3>supporting graphics</h3><img src=\"https://imgix.cosmicjs.com/694b6690-88b5-11ec-9eec-e3ad41451efc-Asset-152x.png?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Asset 15@2x.png\" class=\"fr-fic fr-dib\"></div><div class=\"flex section\" style=\"align-items: start;\"><div><h3>typography</h3><img src=\"https://imgix.cosmicjs.com/69097b90-88b5-11ec-9eec-e3ad41451efc-Asset-162x.png?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Asset 16@2x.png\" class=\"fr-fic fr-dib\"></div><div><h3>color</h3><img src=\"https://imgix.cosmicjs.com/68ce6e60-88b5-11ec-9eec-e3ad41451efc-Asset-172x.png?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Asset 17@2x.png\" class=\"fr-fic fr-dib\"></div></div><div class=\"section\"><h3>stationery</h3><div class=\"grid\"><img src=\"https://imgix.cosmicjs.com/e13f2500-88b6-11ec-9eec-e3ad41451efc-Asset-192x-100.jpg?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Asset 19@2x-100.jpg\" class=\"fr-fic fr-dib long\">\r\n<img src=\"https://imgix.cosmicjs.com/1ab64bb0-88b7-11ec-9eec-e3ad41451efc-A4-Paper-PSD-MockUp.jpg?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"A4 Paper PSD MockUp.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://imgix.cosmicjs.com/82f0e1e0-88b7-11ec-9eec-e3ad41451efc-Asset-202x-100.jpg?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Asset 20@2x-100.jpg\" class=\"fr-fic fr-dib\"></div><img src=\"https://imgix.cosmicjs.com/585263f0-88b7-11ec-9eec-e3ad41451efc-Magazine-Mockup.jpg?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Magazine Mockup.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://imgix.cosmicjs.com/c06b4150-88b7-11ec-9eec-e3ad41451efc-Envelope-and-Letterhead-Mockup.jpg?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"Envelope and Letterhead Mockup.jpg\" class=\"fr-fic fr-dib\">\r\n<img src=\"https://imgix.cosmicjs.com/b52e0ed0-88b7-11ec-9eec-e3ad41451efc-1.jpg?auto=format&q=90\" data-folder=\"jack-the-clipper-content\" data-name=\"1.jpg\" class=\"fr-fic fr-dib\"></div>",
          "created": "2018-01-05T16:01:22.021Z",
          "created_at": "2018-01-05T16:01:22.021Z",
          "modified_at": "2022-07-03T13:38:13.293Z",
          "status": "published",
          "published_at": "2022-07-03T13:38:13.293Z",
          "thumbnail": "https://imgix.cosmicjs.com/28a42b00-f920-11ec-b2b1-473235369c53-Artboard-1-copy-6-80.jpg",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "created_by": "63ebe9e626112600089ee664",
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/1f7302b0-88b2-11ec-9eec-e3ad41451efc-Sequence-01.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/1f7302b0-88b2-11ec-9eec-e3ad41451efc-Sequence-01.mp4"
      },
            "colors": [
              {
                "r": 0.992,
                "g": 0.992,
                "b": 0.925
              },
              {
                "r": 0.804,
                "g": 0.196,
                "b": 0.247
              }
            ],
            "theme": "light",
            "description": "Jack the Clipper is a unique barbershop experience taken from a well-known serial killer, Jack the Ripper. The idea behind the logo is a combination of bold old-school typeface with an unidentifiable common head and a clipper. The person in the logo brings a mysterious mood while the font shows seriousness in a ‘40s typeface. The clipper makes the brand identifiable as a barber as well as a representation of a weapon.",
            "tools": "Adobe Illustrator, Adobe Photoshop, Adobe Lightroom",
            "type": "The One Academy College Project",
            "year": 2019,
            "external": null,
            "role": "Brand Designer"
          }
        }
      ],
      "4_360": [
        {
          "id": "661282c98eeb799dd185ddf3",
          "slug": "ioniq-5-batik",
          "title": "IONIQ 5 Batik Edition",
          "content": "<div class=\"section\"><h3>Progress</h3><span draggable=\"true\" class=\"fr-video fr-dvb fr-draggable\"><video src=\"https://cdn.cosmicjs.com/0a6e1930-db69-11ed-9081-afb8d99da5f0-DIRCUT---HYUNDAI.mp4\" controls=\"\" class=\"fr-draggable fr-fvc fr-dvi\">Your browser does not support HTML5 video.</video></span></div><div class=\"section\"><h3>Logo</h3><p><span draggable=\"true\" class=\"fr-video fr-dvb fr-draggable\"><video src=\"https://cdn.cosmicjs.com/6448e020-db69-11ed-9081-afb8d99da5f0-CRETA-Dynamic-Black-Edition--Berani-dan-Penuh-Sensasi-with-Tamara-Dai.mp4\" controls=\"\" class=\"fr-draggable fr-fvc fr-dvi\">Your browser does not support HTML5 video.</video></span></p></div><div class=\"section\"><h3 id=\"isPasted\">Supergraphics</h3><img class=\"fr-fic fr-dib\" src=\"https://cdn.cosmicjs.com/be800700-dbad-11ed-b6eb-0fc980522195-Dominate.png\"><h3 id=\"isPasted\">Colors</h3><div class=\"grid\"><img class=\"fr-fic fr-dib\" src=\"https://cdn.cosmicjs.com/9f258ed0-dbac-11ed-b6eb-0fc980522195-332330393119127151099143199731880139564060n.jpg\"><h3 id=\"isPasted\">Tone / Mood</h3><img class=\"fr-fic fr-dib\" src=\"https://cdn.cosmicjs.com/d76e5230-dbad-11ed-b6eb-0fc980522195-3323625047357038849253275302583466967106252n.jpg\"><h3 id=\"isPasted\">Social Media</h3><img class=\"fr-fic fr-dib\" src=\"https://cdn.cosmicjs.com/debeba20-dbad-11ed-b6eb-0fc980522195-33293376159792240221306326842596486046215494n.jpg\"><h3 id=\"isPasted\">Posters</h3><img data-pin-me-only=\"true\" class=\"fr-fic fr-dib\" src=\"https://cdn.cosmicjs.com/e2506c60-dbad-11ed-b6eb-0fc980522195-33301508119821113055141335115794575428074120n.jpg\"></div></div><div class=\"section\"><h3>Website</h3><img class=\"fr-fic fr-dib\" src=\"https://cdn.cosmicjs.com/8e6a73a0-db6e-11ed-9081-afb8d99da5f0-Adversiment-Billboard-mockup-vol4.jpg\"></div>",
          "bucket": "63ebea30c1151e00086db96f",
          "created_at": "2024-04-07T11:26:01.031Z",
          "modified_at": "2024-09-03T03:34:37.234Z",
          "status": "published",
          "modified_by": "63ebe9e626112600089ee664",
          "created_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "thumbnail": "https://imgix.cosmicjs.com/40fb06d0-f561-11ee-b8e9-b1c350f53f6e-DSC00976-01.jpg",
          "created": "2024-04-07T11:26:01.031Z",
          "published_at": "2024-09-03T03:34:37.234Z",
          "type": "posts",
          "metadata": {
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/72d889d0-69dc-11ef-a492-5bdc7520fe60-Batik-Movie.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/72d889d0-69dc-11ef-a492-5bdc7520fe60-Batik-Movie.mp4"
      },
            "awards": null,
            "theme": "dark",
            "description": "ARC’TERYX: Cambrian is a new clothing line paleontology & archeology concept. This Spring/Summer collection consists of high-quality outdoor clothing and climbing gear products.",
            "tools": "Blender, Illustrator, Photoshop",
            "type": "Freelance",
            "year": 2024,
            "external": null,
            "role": "Publication Designer, Motion Graphics Designer, Art Director, Digital Designer"
          }
        },
        {
          "id": "650a593c1a7dbc957868b9d3",
          "slug": "creta",
          "title": "CRETA Black",
          "content": "<div class=\"section\"><h3>Launching Video</h3><span class=\"fr-video fr-dvb fr-draggable\" contenteditable=\"false\" draggable=\"true\"><video class=\"fr-draggable fr-fvc fr-dvi\" controls=\"\" src=\"https://cdn.cosmicjs.com/0a6e1930-db69-11ed-9081-afb8d99da5f0-DIRCUT---HYUNDAI.mp4\">Your browser does not support HTML5 video.</video></span></div><div class=\"section\"><h3>Digital</h3><p><span class=\"fr-video fr-dvb fr-draggable\" contenteditable=\"false\" draggable=\"true\"><video class=\"fr-draggable fr-fvc fr-dvi\" controls=\"\" src=\"https://cdn.cosmicjs.com/6448e020-db69-11ed-9081-afb8d99da5f0-CRETA-Dynamic-Black-Edition--Berani-dan-Penuh-Sensasi-with-Tamara-Dai.mp4\">Your browser does not support HTML5 video.</video></span></p></div><div class=\"section\"><img src=\"https://cdn.cosmicjs.com/be800700-dbad-11ed-b6eb-0fc980522195-Dominate.png\" class=\"fr-fic fr-dib\"><div class=\"grid\"><img src=\"https://cdn.cosmicjs.com/9f258ed0-dbac-11ed-b6eb-0fc980522195-332330393119127151099143199731880139564060n.jpg\" class=\"fr-fic fr-dib\"><img src=\"https://cdn.cosmicjs.com/d76e5230-dbad-11ed-b6eb-0fc980522195-3323625047357038849253275302583466967106252n.jpg\" class=\"fr-fic fr-dib\"><img src=\"https://cdn.cosmicjs.com/debeba20-dbad-11ed-b6eb-0fc980522195-33293376159792240221306326842596486046215494n.jpg\" class=\"fr-fic fr-dib\"><img src=\"https://cdn.cosmicjs.com/e2506c60-dbad-11ed-b6eb-0fc980522195-33301508119821113055141335115794575428074120n.jpg\" class=\"fr-fic fr-dib\"></div></div><div class=\"section\"><h3>OOH</h3><img src=\"https://cdn.cosmicjs.com/8e6a73a0-db6e-11ed-9081-afb8d99da5f0-Adversiment-Billboard-mockup-vol4.jpg\" class=\"fr-fic fr-dib\"></div>",
          "bucket": "63ebea30c1151e00086db96f",
          "created_at": "2023-04-15T16:54:33.179Z",
          "created_by": "63ebe9e626112600089ee664",
          "modified_at": "2023-06-19T11:24:24.209Z",
          "created": "2023-04-15T16:54:33.179Z",
          "status": "published",
          "thumbnail": "https://imgix.cosmicjs.com/2cb8bb90-dbae-11ed-b6eb-0fc980522195-KV-1-OK-rev-TERANG-copy.jpg",
          "modified_by": "63ebe9e626112600089ee664",
          "publish_at": null,
          "unpublish_at": null,
          "published_at": "2023-06-19T11:24:24.209Z",
          "type": "posts",
          "metadata": {
            "ar_android": null,
            "ar_ios": null,
            "ar": null,
"thumbnail": {
        "url": "https://cdn.cosmicjs.com/0a6e1930-db69-11ed-9081-afb8d99da5f0-DIRCUT---HYUNDAI.mp4",
        "imgix_url": "https://cdn.cosmicjs.com/0a6e1930-db69-11ed-9081-afb8d99da5f0-DIRCUT---HYUNDAI.mp4"
      },
            "colors": [
              {
                "r": 0.988,
                "g": 0.51,
                "b": 0
              },
              {
                "r": 0,
                "g": 0.859,
                "b": 0.988
              }
            ],
            "theme": "dark",
            "description": "Those who love black live colorful lives. CRETA Black Dynamic Edition launched in IIMS 2023 with a launch video, digital video, & OOH ads plus a collaboration with Dominate.",
            "tools": "Davinci Resolve, Adobe After Effects, Adobe Photoshop",
            "type": "Work for Innocean Indonesia",
            "year": 2023,
            "external": "https://www.hyundai.com/id/id/find-a-car/creta/creta-black",
            "role": "Art Director"
          }
        }
      ]
}
) as unknown as {[key: string]: CMS[]}

export const projectsStore = {
    get projects() { return projects },
    get projectsArr() {
      const arr = []
      for (const prop in projects) {
        arr.push(...projects[prop as keyof typeof projects])
      }
      return arr;
    },
    get projectsLength() {
      let count = 0
      for (const prop in projects) {
        count += Math.max(0, projects[prop as keyof typeof projects].length)
      }
      return count;
    }
}


// let activeIndex = $state(0)
let inertiaIndex = $state(0)

export const countStore = {
  set activeIndex(bool: boolean) {
    const y = bool ? 1 : -1;
    inertiaIndex = Math.max(Math.min(inertiaIndex + y, projectsStore.projectsLength - 1), 0)
  },
  set inertiaIndex(num: number) {
    inertiaIndex = num
  },
  get inertiaIndex(): number { return inertiaIndex }
}

let isAnimating = $state(false);
let categories = $state([
  'Highlights',
  'Website',
  'Design',
  '360'
])
let currentCat = $state(['Highlights', 0])

export const homeStore = {
  get categories(): string[] { return categories },
  get isAnimating(): boolean { return isAnimating },
  set isAnimating(val: boolean) { isAnimating = val },
  get categoriesLength(): number[] {
    const length: number[] = []
    for (const prop in projects) {
      const consecutive = length.length ? length[length.length - 1] : 0
      length.push(consecutive + projects[prop as keyof typeof projects].length)
    }
    return length;
  },
  set currentCat(val: (string | number)[]) {
    if (val[0]) currentCat = val;
  },
  get currentCat(): (string| number)[] { return currentCat }
}
