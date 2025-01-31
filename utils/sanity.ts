import type { Post, About } from '~/types/queries'

const queries = {
  landing: groq`{
  "post":  *[_type == "post"] | order(index asc) {
  _id,
  _rev,
    _type,
  title,
  description,
  type,
  role,
  color,
  content[] {
    "media": {
      "asset": media.asset->{
        _id,
        url,
        originalFilename,
        size
      }
    },
    headline,
    body,
    caption
  },
  link,
  slug,
  year,
  tools,
  awards[] {
    "icon": {
      "asset": icon.asset->{
        _id,
        url,
        originalFilename,
        size
      }
    },
    gold,
    silver,
    bronze,
    crystal,
    issuer,
    index
  },
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
}`,
  about: groq`
{
"about" : *[_type == "about"]{
  _type,
  _id,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  "image": {
      "asset": image.asset->{
      _id,
      url,
      originalFilename,
      size
    }
  },
  awards[] {
    "icon": {
      "asset": icon.asset->{
        _id,
        url,
        originalFilename,
        size
      }
    },
    gold,
    silver,
    bronze,
    crystal,
    issuer,
    index
  },
  bio,
    languages,
    skills
} | order(_createdAt asc)[0]
}`,
}

export async function fetchSanity(type: 'landing' | 'about') {
  const sanity = useSanity()
  return await sanity.fetch<{ post: Post[] } | About>(queries[type])
  // console.log('test', data)
  // return data
}
