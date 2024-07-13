import { RemoteTypeStore } from '@/services'
import { useMutation } from '@tanstack/react-query'

export const useTypeStore = () => {
  const remoteListTypes = new RemoteTypeStore()

  return useMutation({
    mutationFn: remoteListTypes.store
  })
}
