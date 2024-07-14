import { api } from '@/api'
import { TaxDestroy } from '@/interfaces'

export class RemoteTaxDestroy implements TaxDestroy {
  async destroy(input: TaxDestroy.Params): Promise<TaxDestroy.Result> {
    const httpResponse = await api.delete<TaxDestroy.Result>(
      `taxes/${input.id}`
    )

    return httpResponse.data
  }
}
