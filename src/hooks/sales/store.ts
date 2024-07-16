import { RemoteSaleStore } from '@/services'
import { useMutation } from '@tanstack/react-query'

export const useSaleStore = () => {
  const remoteSaleStore = new RemoteSaleStore()

  return useMutation({
    mutationFn: remoteSaleStore.store
  })
}
