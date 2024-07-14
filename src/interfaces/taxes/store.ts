export interface TaxStore {
  store(input: TaxStore.Params): Promise<TaxStore.Result>
}

export namespace TaxStore {
  export type Params = {
    name: string
    percentage: number
  }
  export type Result = undefined
}
