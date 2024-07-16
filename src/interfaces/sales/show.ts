export interface SaleShow {
  show(input: SaleShow.Params): Promise<SaleShow.Result>
}

export namespace SaleShow {
  export type Params = {
    id: number
  }

  export type Result = {
    id: number
    customer: string
    email: string
    zip_code: string
    address: string
    address_number: number
    description?: string
    amount: number
    taxesAmount: number
    totalAmount: number
    items: Array<{
      id: string
      name: string
      quantity: number,
      amount: number,
      taxes_amount: number,
      total_amount: number,
    }> | []
    created_at: string
    updated_at?: string
  }
}
