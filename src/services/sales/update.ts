import { api } from '@/api'
import { SaleUpdate } from '@/interfaces'

export class RemoteSaleUpdate implements SaleUpdate {
  async update(input: SaleUpdate.Params): Promise<SaleUpdate.Result> {
    const httpResponse = await api.put<SaleUpdate.Result>(
      `sales/${input.id}`,
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
