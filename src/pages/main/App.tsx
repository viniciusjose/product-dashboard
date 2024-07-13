import { Search } from 'lucide-react'
import { Input } from '@/components/shadcn/ui/input'
import { Navbar } from '@/pages/main/components/navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from '@/components/shadcn/ui'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Navbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
          <Outlet />
          <Toaster />
          <ReactQueryDevtools />
        </main>
      </div>
    </div>
  )
}
