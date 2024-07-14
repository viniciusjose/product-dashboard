export interface ListTaxes {
  list(): Promise<ListTaxes.Result>
}

export namespace ListTaxes {
  export type Result = Array<{
    id: number
    name: string
    percentage: number
    created_at: string
    updated_at?: string
  }>
}
