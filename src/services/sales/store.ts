import { api } from '@/api'
import { SaleStore } from '@/interfaces'

export class RemoteSaleStore implements SaleStore {
  async store(input: SaleStore.Params): Promise<SaleStore.Result> {
    const httpResponse = await api.post<SaleStore.Result>(
      'sales',
      {
        customer: input.customer,
        email: input.email,
        zipCode: input.zip_code,
        address: input.address,
        addressNumber: input.address_number,
        description: input.description
      }
    )

    return httpResponse.data
  }
}
