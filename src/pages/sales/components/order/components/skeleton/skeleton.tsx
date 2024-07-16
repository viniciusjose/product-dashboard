import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
  Skeleton
} from '@/components/shadcn/ui'

export const SkeletonComponent = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start">
        <div className="grid gap-1">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[150px]" />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-12" />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <Skeleton className="h-36 w-[100%]" />
        <Separator className="my-4" />
        <div>
          <Skeleton className="h-36 w-[100%]" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <Skeleton className="h-3 w-[150px]" />
        </div>
      </CardFooter>
    </Card>
  )
}
