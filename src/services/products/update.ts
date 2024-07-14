import { api } from '@/api'
import { ProductUpdate } from '@/interfaces'

export class RemoteProductUpdate implements ProductUpdate {
  async show(input: ProductUpdate.Params): Promise<ProductUpdate.Result> {
    const httpResponse = await api.put<ProductUpdate.Result>(
      `products/${input.id}`,
      {
        name: input.name,
        price: input.price,
        types: input.types
      }
    )

    return httpResponse.data
  }
}
