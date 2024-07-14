import { RemoteTypeDestroy } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { TypeDestroy } from '@/interfaces'

export function TypeDestroyRequest(input: TypeDestroy.Params) {
  const remoteTypeDestroy = new RemoteTypeDestroy()

  return remoteTypeDestroy.destroy(input)
}

export const useTypeDestroy = () => {
  return useMutation({
    mutationFn: TypeDestroyRequest
  })
}
