export interface SaleAddProduct {
  addProduct(input: SaleAddProduct.Params): Promise<SaleAddProduct.Result>
}

export namespace SaleAddProduct {
  export type Params = {
    id: number
    product_id: number
    quantity: number
  }

  export type Result = undefined
}
