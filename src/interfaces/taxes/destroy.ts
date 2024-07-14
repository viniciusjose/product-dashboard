export interface TaxDestroy {
  destroy(input: TaxDestroy.Params): Promise<TaxDestroy.Result>
}

export namespace TaxDestroy {
  export type Params = {
    id: number
  }

  export type Result = undefined
}
