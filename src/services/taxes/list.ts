import { api } from '@/api'
import { ListTaxes } from '@/interfaces'

export class RemoteListTaxs implements ListTaxes {
  async list(): Promise<ListTaxes.Result> {
    const httpResponse = await api.get<ListTaxes.Result>('taxes')

    return httpResponse.data
  }
}
