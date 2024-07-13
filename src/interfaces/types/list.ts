export interface ListTypes {
  list(): Promise<ListTypes.Result>
}

export namespace ListTypes {
  export type Result = Array<{
    id: number
    name: string
    description?: string
    created_at: string
    updated_at?: string
  }>
}
