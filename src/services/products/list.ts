import { api } from '@/api'
import { ListProducts } from '@/interfaces'

export class RemoteListProducts implements ListProducts {
  async list(): Promise<ListProducts.Result> {
    const httpResponse = await api.get<ListProducts.Result>('products')

    return httpResponse.data
  }
}
