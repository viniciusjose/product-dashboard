import { RemoteProductUpdate } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { ProductUpdate } from '@/interfaces'

export function ProductUpdateRequest(input: ProductUpdate.Params) {
  const remoteProductUpdate = new RemoteProductUpdate()

  return remoteProductUpdate.show(input)
}

export const useProductUpdate = () => {
  return useMutation({
    mutationFn: ProductUpdateRequest
  })
}
