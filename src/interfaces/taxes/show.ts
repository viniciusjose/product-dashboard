export interface TaxShow {
  show(input: TaxShow.Params): Promise<TaxShow.Result>
}

export namespace TaxShow {
  export type Params = {
    id: number
  }

  export type Result = {
    id: number
    name: string
    percentage: number
    created_at: string
    updated_at?: string
  }
}
