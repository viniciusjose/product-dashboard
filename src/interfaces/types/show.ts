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
    taxes: Array<{
      id: number
      name: string
      description?: string
    }> | []
    created_at: string
    updated_at: string
  }
}
