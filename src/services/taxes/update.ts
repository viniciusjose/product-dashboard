import { api } from '@/api'
import { TaxUpdate } from '@/interfaces'

export class RemoteTaxUpdate implements TaxUpdate {
  async show(input: TaxUpdate.Params): Promise<TaxUpdate.Result> {
    const httpResponse = await api.put<TaxUpdate.Result>(
      `taxes/${input.id}`,
      {
        name: input.name,
        percentage: input.percentage
      }
    )

    return httpResponse.data
  }
}
