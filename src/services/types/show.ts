import { api } from '@/api'
import { TypeShow } from '@/interfaces'

export class RemoteTypeShow implements TypeShow {
  async show(input: TypeShow.Params): Promise<TypeShow.Result> {
    const httpResponse = await api.get<TypeShow.Result>(
      `types/${input.id}`
    )

    return httpResponse.data
  }
}
