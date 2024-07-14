import { api } from '@/api'
import { ProductStore } from '@/interfaces'

export class RemoteProductStore implements ProductStore {
  async store(input: ProductStore.Params): Promise<ProductStore.Result> {
    const httpResponse = await api.post<ProductStore.Result>(
      'products',
      input
    )

    return httpResponse.data
  }
}
