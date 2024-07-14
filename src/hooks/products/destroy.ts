import { RemoteProductDestroy } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { ProductDestroy } from '@/interfaces'

export function ProductDestroyRequest(input: ProductDestroy.Params) {
  const remoteProductDestroy = new RemoteProductDestroy()

  return remoteProductDestroy.destroy(input)
}

export const useProductDestroy = () => {
  return useMutation({
    mutationFn: ProductDestroyRequest
  })
}
