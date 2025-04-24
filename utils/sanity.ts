import type { Post, About } from '~/types/queries'

const queries = {
  landing: groq`{
    "post":  *[_type == "post" && !(_id in path('drafts.**'))] | order(index asc) {
      _id,
      _rev,
        _type,
      title,
      description,
      type,
      role,
      color,
      content[] {
        "image": {
          "asset": image.asset->{
            _id,
            url,
            originalFilename,
            size
          }
        },
        "imageLight": {
          "asset": imageLight.asset->{
            _id,
            url,
            originalFilename,
            size
          }
        },
        "video": {
          "asset": video.asset->{
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
      carousel[] {
        "image": {
          "asset": image.asset->{
            _id,
            url,
            originalFilename,
            size
          }
        },
        "video": {
          "asset": video.asset->{
            _id,
            url,
            originalFilename,
            size
          }
        },
        alt,
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
      "thumbnailImage": {
        "asset": thumbnailImage.asset->{
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
  about: groq`{
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
      socials,
      bio,
      skills,
      "resume": {
        "asset": resume.asset->{
          _id,
          url,
          originalFilename,
          size
        }
      }
    } | order(_createdAt asc)[0]
  }`,
}

export async function fetchSanity<T extends 'landing' | 'about'>(
  type: T,
): Promise<T extends 'landing' ? { post: Post[] } : { about: About }> {
  const sanity = useSanity()
  return await sanity.fetch<
    T extends 'landing' ? { post: Post[] } : { about: About }
  >(queries[type])
}
