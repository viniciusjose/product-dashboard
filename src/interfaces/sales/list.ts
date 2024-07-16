export interface ListSales {
  list(): Promise<ListSales.Result>
}

export namespace ListSales {
  export type Result = Array<{
    id: number
    customer: string
    email: string
    zip_code: string
    address: string
    address_number: number
    description?: string
    amount: number
    taxes_amount: number
    total_amount: number
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
  }>
}
