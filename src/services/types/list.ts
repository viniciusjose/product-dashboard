import { api } from '@/api'
import { ListTypes } from '@/interfaces'

export class RemoteListTypes implements ListTypes {
  async list(): Promise<ListTypes.Result> {
    const httpResponse = await api.get<ListTypes.Result>('types')

    return httpResponse.data
  }
}
