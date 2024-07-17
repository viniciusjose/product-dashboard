import { api } from '@/api'
import { ProductDestroy } from '@/interfaces'

export class RemoteProductDestroy implements ProductDestroy {
  async destroy(input: ProductDestroy.Params): Promise<ProductDestroy.Result> {
    const httpResponse = await api.delete<ProductDestroy.Result>(
      `products/${input.id}`
    )

    return httpResponse.data
  }
}

