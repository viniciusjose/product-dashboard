export interface ProductShow {
  show(input: ProductShow.Params): Promise<ProductShow.Result>
}

export namespace ProductShow {
  export type Params = {
    id: number
  }

  export type Result = {
    id: number
    name: string
    price: number
    types: Array<{
      id: number
      name: string
      description?: string
    }> | []
    created_at: string
    updated_at: string
  }
}
