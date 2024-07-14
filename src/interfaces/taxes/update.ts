export interface TaxUpdate {
  show(input: TaxUpdate.Params): Promise<TaxUpdate.Result>
}

export namespace TaxUpdate {
  export type Params = {
    id: number
    name: string
    percentage: number
  }

  export type Result = {
    id: number
    name: string
    percentage: number
    created_at: string
    updated_at: string
  }
}
