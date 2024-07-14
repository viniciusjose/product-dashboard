import { api } from '@/api'
import { TaxStore } from '@/interfaces'

export class RemoteTaxStore implements TaxStore {
  async store(input: TaxStore.Params): Promise<TaxStore.Result> {
    const httpResponse = await api.post<TaxStore.Result>(
      'taxes',
      input
    )

    return httpResponse.data
  }
}
