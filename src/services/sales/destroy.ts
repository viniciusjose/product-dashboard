import { api } from '@/api'
import { SaleDestroy } from '@/interfaces'

export class RemoteSaleDestroy implements SaleDestroy {
  async destroy(input: SaleDestroy.Params): Promise<SaleDestroy.Result> {
    const httpResponse = await api.delete<SaleDestroy.Result>(
      `sales/${input.id}`
    )

    return httpResponse.data
  }
}
