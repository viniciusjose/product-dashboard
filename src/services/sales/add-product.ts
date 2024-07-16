import { api } from '@/api'
import { SaleAddProduct } from '@/interfaces'

export class RemoteSaleAddProduct implements SaleAddProduct {
  async addProduct(input: SaleAddProduct.Params): Promise<SaleAddProduct.Result> {
    const httpResponse = await api.post<SaleAddProduct.Result>(
      `sales/${input.id}/products`,
      {
        product_id: input.product_id,
        quantity: input.quantity
      }
    )

    return httpResponse.data
  }
}
