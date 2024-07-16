export interface SaleStore {
  store(input: SaleStore.Params): Promise<SaleStore.Result>
}

export namespace SaleStore {
  export type Params = {
    customer: string
    email: string
    zip_code: string
    address: string
    address_number: number
    description?: string
  }
  export type Result = undefined
}
