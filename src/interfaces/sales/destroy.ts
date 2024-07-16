export interface SaleDestroy {
  destroy(input: SaleDestroy.Params): Promise<SaleDestroy.Result>
}

export namespace SaleDestroy {
  export type Params = {
    id: number
  }

  export type Result = undefined
}
