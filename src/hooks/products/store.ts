import { RemoteProductStore } from '@/services'
import { useMutation } from '@tanstack/react-query'

export const useProductStore = () => {
  const remoteListProducts = new RemoteProductStore()

  return useMutation({
    mutationFn: remoteListProducts.store
  })
}
