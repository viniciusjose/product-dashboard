import { RemoteSaleDestroy } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { SaleDestroy } from '@/interfaces'

export function SaleDestroyRequest(input: SaleDestroy.Params) {
  const remoteSaleDestroy = new RemoteSaleDestroy()

  return remoteSaleDestroy.destroy(input)
}

export const useSaleDestroy = () => {
  return useMutation({
    mutationFn: SaleDestroyRequest
  })
}
