import { RemoteSaleAddProduct } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { SaleAddProduct } from '@/interfaces'

export function SaleAddProductRequest(input: SaleAddProduct.Params) {
  const remoteSaleAddProduct = new RemoteSaleAddProduct()

  return remoteSaleAddProduct.addProduct(input)
}

export const useSaleAddProduct = () => {
  return useMutation({
    mutationFn: SaleAddProductRequest
  })
}
