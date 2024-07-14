import { useQuery } from '@tanstack/react-query'
import { RemoteListTaxs } from '@/services'

export const useListTaxes = () => {
  const remoteListTaxes = new RemoteListTaxs()

  return useQuery({
    queryKey: ['taxes'],
    queryFn: remoteListTaxes.list,
    refetchOnWindowFocus: "always"
  })
}
