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
