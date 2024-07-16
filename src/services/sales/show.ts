import { api } from '@/api'
import { SaleShow } from '@/interfaces'

export class RemoteSaleShow implements SaleShow {
  async show(input: SaleShow.Params): Promise<SaleShow.Result> {
    const httpResponse = await api.get<SaleShow.Result>(
      `sales/${input.id}`
    )

    return httpResponse.data
  }
}
