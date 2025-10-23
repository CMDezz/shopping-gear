import * as ShaHoverCard from '@shadcn-ui/hover-card'
import { cn } from '@/lib/utils/cn'

export const HoverCard = ({
    ...props
}: React.ComponentProps<typeof ShaHoverCard.HoverCard>) => (
    <ShaHoverCard.HoverCard {...props} />
)

export const HoverCardTrigger = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaHoverCard.HoverCardTrigger>) => (
    <ShaHoverCard.HoverCardTrigger className={cn(className)} {...props} />
)

export const HoverCardContent = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaHoverCard.HoverCardContent>) => (
    <ShaHoverCard.HoverCardContent className={cn(className)} {...props} />
)
