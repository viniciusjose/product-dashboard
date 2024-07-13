export interface TypeStore {
  store(input: TypeStore.Params): Promise<TypeStore.Result>
}

export namespace TypeStore {
  export type Params = {
    name: string
    description: string | undefined | null
  }
  export type Result = undefined
}
