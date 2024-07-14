export interface ProductUpdate {
  show(input: ProductUpdate.Params): Promise<ProductUpdate.Result>
}

export namespace ProductUpdate {
  export type Params = {
    id: number
    name: string
    price: number
    types: Array<{ id: number }>
  }

  export type Result = {
    id: number
    name: string
    price: number
    types: Array<{
      id: number
      name: string
      description: string
    }>
    created_at: string
    updated_at: string
  }
}
