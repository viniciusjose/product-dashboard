import { RemoteSaleUpdate } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { SaleUpdate } from '@/interfaces'

export function SaleUpdateRequest(input: SaleUpdate.Params) {
  const remoteSaleUpdate = new RemoteSaleUpdate()

  return remoteSaleUpdate.update(input)
}

export const useSaleUpdate = () => {
  return useMutation({
    mutationFn: SaleUpdateRequest
  })
}
