import { RemoteTaxStore } from '@/services'
import { useMutation } from '@tanstack/react-query'

export const useTaxStore = () => {
  const remoteTaxStore = new RemoteTaxStore()

  return useMutation({
    mutationFn: remoteTaxStore.store
  })
}
