export interface PostJson {
  url: string
  header:
    | {
        "Content-Type": string | undefined
        Authorization: string | undefined
      }
    | undefined
  data: Record<string, unknown>
}

export interface GetJson {
  url: string
  header?: {
    "Content-Type": string | undefined
  }
}

export interface FormValidation {
  type: string
  value: string
  required: boolean | undefined
}

export interface FormData {
  value: string
  error: string
}

export interface Blog {
  images: Array<string>
  description: string
  title: string
  date: string
  id: string
}
