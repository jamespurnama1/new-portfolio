import { gql } from "@apollo/client/core"

const config = useRuntimeConfig().public
const bucket_slug = config.BUCKET_SLUG
const read_key = config.READ_KEY

export const GET_OBJECTS = gql`
  query getObjects() {
    getObjects(
      bucket_slug: bucket_slug
      read_key: read_key
    ) {
      objects {
        title
        slug
        id
        metadata
      }
    }
  }
`
export const GET_POSTS = gql`
  query getObject(
    $folder: String!
    $object_id: ID!
  ) {
    getObject(
      bucket_slug: bucket_slug
      read_key: read_key
      object_id: $object_id
    ) {
      content
    }

    getMedia(
      bucket_slug: bucket_slug
      read_key: read_key
      input: {
        query: {
          folder: $folder
        }
      }
      ) {
      media {
        imgix_url
        metadata
      }
    }
  }
`

export const GET_ID = gql`
  query getObjects() {
    getObjects(
      bucket_slug: bucket_slug
      read_key: read_key
    ) {
      objects {
        title
        slug
        id
        metadata
      }
    }
  }
`
