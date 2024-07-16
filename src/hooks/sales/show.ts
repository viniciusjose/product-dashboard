import { RemoteSaleShow } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { SaleShow } from '@/interfaces'

export function SaleShowRequest({ id }: SaleShow.Params) {
  const remoteSaleShow = new RemoteSaleShow()

  return remoteSaleShow.show({ id })
}

export const useSaleShow = () => {
  return useMutation({
    mutationFn: SaleShowRequest
  })
}
