export interface SanityDocument {
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
}

export interface SanityReference<Type extends SanityDocument> {
  _type: 'reference'
  _ref: string
  _weak?: boolean
}

export interface SanityCrossDatasetReference extends SanityReference<never> {
  _dataset: string
}

export interface SanityImage {
  _type: 'image'
  asset: SanityReference<SanityImageAsset>
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
}

export type ArrayMemberType<Member> = Member extends {
  _type: infer Type
}
  ? Type
  : string

export type ArrayMember<Member> = Member extends string | number | boolean
  ? Member
  : Member & {
      _key: string
      _type: ArrayMemberType<Member>
    }

export interface SanitySlug {
  _type: 'slug'

  /**
   * The current value of the slug.
   */
  current: string
}

export interface SanityGeopoint {
  _type: 'geopoint'

  /**
   * Latitude
   */
  lat: number 

  /**
   * Longitude
   */
  lng: number 

  /**
   * Altitude
   */
  alt: number 
}

// export type PortableTextBlock = Record<string, unknown>

export type Markdown = string

export interface Post extends SanityDocument {
  _type: 'post'
  title: string 
  description: string 
  tools: ArrayMember<string>[] 
  type: string 
  role: ArrayMember<string>[] 
  link: string 
  year: number 
  slug: SanitySlug 
  thumbnail: SanityFileAsset 
  awards: ArrayMember<{
    issuer: string 
    gold: string 
    silver: string 
    bronze: string 
  }>[] | null
  content: Markdown 
}

export interface Data {
  post: Post[]
  category: Landing[]
}

// type Modify<T, R> = Omit<T, keyof R> & R;
// export interface modifiedLanding extends Modify<Landing, {
//  items: Post[]
// }> {}

export interface Landing extends SanityDocument {
  _type: 'landing'
  title: string 
  items: ArrayMember<SanityReference<Post>>[]  | Post[]
}

export interface SanityAssetSourceData {
  name: string 
  id: string 
  url: string 
}

export interface SanityImageAsset extends SanityDocument {
  _type: 'sanity.imageAsset'
  originalFilename: string 
  label: string 
  title: string 
  description: string 
  altText: string 
  sha1hash: string 
  extension: string 
  mimeType: string 
  size: number 
  assetId: string 
  uploadId: string 
  path: string 
  url: string 
  metadata: SanityImageMetadata 
  source: SanityAssetSourceData 
}

export interface SanityFileAsset extends SanityDocument {
    asset: {
      _id: string
      url: string
      originalFilename: string
      size: number
    }
}

// export interface SanityFileAsset extends SanityDocument {
//   _type: 'sanity.fileAsset'
//   originalFilename: string 
//   label: string 
//   title: string 
//   description: string 
//   altText: string 
//   sha1hash: string 
//   extension: string 
//   mimeType: string 
//   size: number 
//   assetId: string 
//   uploadId: string 
//   path: string 
//   url: string 
//   source: SanityAssetSourceData 
// }

export interface SanityImageCrop {
  top: number 
  bottom: number 
  left: number 
  right: number 
}

export interface SanityImageHotspot {
  x: number 
  y: number 
  height: number 
  width: number 
}

export interface SanityImageMetadata {
  location: SanityGeopoint 
  dimensions: SanityImageDimensions 
  palette: SanityImagePalette 
  lqip: string 
  blurHash: string 
  hasAlpha: boolean 
  isOpaque: boolean 
}

export interface SanityImageDimensions {
  height: number 
  width: number 
  aspectRatio: number 
}

export interface SanityImagePalette {
  darkMuted: SanityImagePaletteSwatch 
  lightVibrant: SanityImagePaletteSwatch 
  darkVibrant: SanityImagePaletteSwatch 
  vibrant: SanityImagePaletteSwatch 
  dominant: SanityImagePaletteSwatch 
  lightMuted: SanityImagePaletteSwatch 
  muted: SanityImagePaletteSwatch 
}

export interface SanityImagePaletteSwatch {
  background: string 
  foreground: string 
  population: number 
  title: string 
}
