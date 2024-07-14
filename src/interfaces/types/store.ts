export interface TypeStore {
  store(input: TypeStore.Params): Promise<TypeStore.Result>
}

export namespace TypeStore {
  export type Params = {
    name: string
    description: string | undefined | null
    taxes?: Array<{ id: number }>
  }
  export type Result = undefined
}
