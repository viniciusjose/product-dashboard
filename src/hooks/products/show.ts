import { RemoteProductShow } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { ProductShow } from '@/interfaces'

export function ProductShowRequest({ id }: ProductShow.Params) {
  const remoteProductShow = new RemoteProductShow()

  return remoteProductShow.show({ id })
}

export const useProductShow = () => {
  return useMutation({
    mutationFn: ProductShowRequest
  })
}
