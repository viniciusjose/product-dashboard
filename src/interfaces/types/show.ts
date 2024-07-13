export interface TypeShow {
  show(input: TypeShow.Params): Promise<TypeShow.Result>
}

export namespace TypeShow {
  export type Params = {
    id: number
  }

  export type Result = {
    id: number
    name: string
    description?: string
  }
}
