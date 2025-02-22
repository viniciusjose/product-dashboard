export interface ListTypes {
  list(): Promise<ListTypes.Result>
}

export namespace ListTypes {
  export type Result = Array<{
    id: number
    name: string
    description?: string
    taxes: Array<{
      id: string
      name: string
      created_at: string
      updated_at?: string
    }> | []
    created_at: string
    updated_at?: string
  }>
}
