import { RemoteTypeUpdate } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { TypeUpdate } from '@/interfaces'

export function TypeUpdateRequest(input: TypeUpdate.Params) {
  const remoteTypeUpdate = new RemoteTypeUpdate()

  return remoteTypeUpdate.show(input)
}

export const useTypeUpdate = () => {
  return useMutation({
    mutationFn: TypeUpdateRequest
  })
}
