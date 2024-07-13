export interface TypeUpdate {
  show(input: TypeUpdate.Params): Promise<TypeUpdate.Result>
}

export namespace TypeUpdate {
  export type Params = {
    id: number
    name: string
    description?: string
  }

  export type Result = {
    id: number
    name: string
    description?: string
    created_at: string
    updated_at: string
  }
}
