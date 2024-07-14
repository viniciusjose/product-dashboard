export interface ListProducts {
  list(): Promise<ListProducts.Result>
}

export namespace ListProducts {
  export type Result = Array<{
    id: number
    name: string
    price: number
    types: Array<{
      id: string
      name: string
      description?: string
      created_at: string
      updated_at?: string
    }> | []
    created_at: string
    updated_at?: string
  }>
}
