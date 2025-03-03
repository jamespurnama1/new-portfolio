import type {
  SanityDocument,
  Reference,
  Asset,
  ImageAsset,
  Slug,
} from '@sanity/types'

export interface Post extends SanityDocument {
  _type: 'post'
  title: string
  description: string
  carousel: {
    media: {
      asset: Asset
    }
    alt: string
  }[]
  tools: string[]
  type: string
  role: string[]
  color: Color
  link: string
  year: number
  slug: Slug
  thumbnail: {
    asset: Asset
  }
  thumbnailImage: {
    asset: Asset
  }
  awards: Award[] | null
  content: Content[]
  catIndex?: number
  index?: number
}

export interface About extends SanityDocument {
  _type: 'about'
  title: 'About'
  languages: {
    percentage: number
    _type: 'LanguageItem'
    language: string
  }[]
  image: {
    asset: Asset
  }
  resume: {
    asset: Asset
  }
  awards: Award[]
  bio: string
  socials: {_type: 'socialsItem'; media: string; link: URL}[]
  skills: { percentage: number; skill: string; type: string }[]
}

export interface Color {
  hex: string
  alpha: number
  _type: 'color'
  hsv: {
    h: number
    a: number
    s: number
    v: number
    _type: 'hsvaColor'
  }
  rgb: {
    r: number
    a: number
    g: number
    b: number
    _type: 'rgbaColor'
  }
  hsl: {
    h: number
    a: number
    s: number
    l: number
    _type: 'hslaColor'
  }
}

export interface Award {
  index: number
  issuer: string
  icon: { asset: ImageAsset }
  year: string
  gold: string[]
  silver: string[]
  bronze: string[]
  crystal: string[]
}

export interface Content {
  show_headline: boolean
  _type: string
  media: { asset: Asset }
  _key: string
  body: string
  headline: string
  caption: string
}
