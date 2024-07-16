import { api } from '@/api'
import { ListSales } from '@/interfaces'

export class RemoteListSales implements ListSales {
  async list(): Promise<ListSales.Result> {
    const httpResponse = await api.get<ListSales.Result>('sales')

    return httpResponse.data
  }
}
