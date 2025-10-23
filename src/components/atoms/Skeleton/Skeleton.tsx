import { Skeleton as ShaSkeleton } from '@shadcn-ui/skeleton'
import { cn } from '@/lib/utils/cn'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkeletonProps
    extends React.ComponentProps<typeof ShaSkeleton> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return <ShaSkeleton className={cn(className)} {...props} />
}
