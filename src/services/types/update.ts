import { api } from '@/api'
import { TypeUpdate } from '@/interfaces'

export class RemoteTypeUpdate implements TypeUpdate {
  async show(input: TypeUpdate.Params): Promise<TypeUpdate.Result> {
    const httpResponse = await api.put<TypeUpdate.Result>(
      `types/${input.id}`,
      {
        name: input.name,
        description: input.description,
        taxes: input.taxes
      }
    )

    return httpResponse.data
  }
}
