export interface CMS {
    id:            string;
    slug:          string;
    title:         string;
    content:       string;
    bucket:        string;
    created_at:    Date;
    created_by:    string;
    modified_at:   Date;
    created:       Date;
    status:        string;
    thumbnail:     string;
    published_at:  Date;
    modified_by:   string;
    publish_at:    null;
    unpublish_at?: null;
    type:          string;
    metadata:      Metadata;
}

export interface Metadata {
    thumbnail:   Thumbnail;
    theme:       null | string;
    description: string;
    tools:       null | string;
    type:        string;
    year:        number | null;
    external:    null;
    role:        null | string;
    awards?:     Issuer;
}

export interface Issuer {
    DandAD:         Awards;
    AdFest:         Awards;
    "Spikes Asia":  Awards;
    "The One Show": Awards;
    "MAD STARS":    Awards;
}

export interface Awards {
  Gold?: string | string[];
  Silver?: string | string[];
  Bronze?: string | string[];
}

export interface Thumbnail {
    url:       string;
    imgix_url: string;
}