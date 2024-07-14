export interface ProductDestroy {
  destroy(input: ProductDestroy.Params): Promise<ProductDestroy.Result>
}

export namespace ProductDestroy {
  export type Params = {
    id: number
  }

  export type Result = undefined
}
