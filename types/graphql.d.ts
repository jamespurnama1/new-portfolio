declare module '*/getObjects.gql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const getObjects: DocumentNode

  export default defaultDocument
}

declare module '*/getPosts.gql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const getObject: DocumentNode

  export default defaultDocument
}
