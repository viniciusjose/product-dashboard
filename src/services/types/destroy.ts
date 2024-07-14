import { api } from '@/api'
import { TypeDestroy } from '@/interfaces'

export class RemoteTypeDestroy implements TypeDestroy {
  async destroy(input: TypeDestroy.Params): Promise<TypeDestroy.Result> {
    const httpResponse = await api.delete<TypeDestroy.Result>(
      `types/${input.id}`
    )

    return httpResponse.data
  }
}
