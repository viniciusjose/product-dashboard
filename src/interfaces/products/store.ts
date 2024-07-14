export interface ProductStore {
  store(input: ProductStore.Params): Promise<ProductStore.Result>
}

export namespace ProductStore {
  export type Params = {
    name: string
    price: number
    types: Array<{ id: number }>
  }
  export type Result = undefined
}
