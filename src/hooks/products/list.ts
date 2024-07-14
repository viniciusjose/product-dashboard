import { useQuery } from '@tanstack/react-query'
import { RemoteListProducts } from '@/services'

export const useListProducts = () => {
  const remoteListProducts = new RemoteListProducts()

  return useQuery({
    queryKey: ['products'],
    queryFn: remoteListProducts.list,
    refetchOnWindowFocus: "always"
  })
}
