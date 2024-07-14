export interface TypeDestroy {
  destroy(input: TypeDestroy.Params): Promise<TypeDestroy.Result>
}

export namespace TypeDestroy {
  export type Params = {
    id: number
  }

  export type Result = undefined
}
