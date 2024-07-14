import { api } from '@/api'
import { TaxShow } from '@/interfaces'

export class RemoteTaxShow implements TaxShow {
  async show(input: TaxShow.Params): Promise<TaxShow.Result> {
    const httpResponse = await api.get<TaxShow.Result>(
      `taxes/${input.id}`
    )

    return httpResponse.data
  }
}
