import { api } from '@/api'
import { TypeStore } from '@/interfaces'

export class RemoteTypeStore implements TypeStore {
  async store(input: TypeStore.Params): Promise<TypeStore.Result> {
    const httpResponse = await api.post<TypeStore.Result>(
      'types',
      input
    )

    return httpResponse.data
  }
}
