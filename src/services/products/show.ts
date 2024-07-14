import { api } from '@/api'
import { ProductShow } from '@/interfaces'

export class RemoteProductShow implements ProductShow {
  async show(input: ProductShow.Params): Promise<ProductShow.Result> {
    const httpResponse = await api.get<ProductShow.Result>(
      `products/${input.id}`
    )

    return httpResponse.data
  }
}
