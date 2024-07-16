export interface SaleUpdate {
  update(input: SaleUpdate.Params): Promise<SaleUpdate.Result>
}

export namespace SaleUpdate {
  export type Params = {
    id: number
    customer: string
    email: string
    zip_code: string
    address: string
    address_number: number
    description?: string
  }
  export type Result = undefined
}
