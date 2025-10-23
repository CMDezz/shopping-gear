// src/components/atoms/Card/index.tsx
import * as ShaCard from '@shadcn-ui/card'
import { cn } from '@/lib/utils'

// Card container
export const Card = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.Card>) => {
    return <ShaCard.Card className={cn(className)} {...props} />
}

// Card header
export const CardHeader = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.CardHeader>) => {
    return <ShaCard.CardHeader className={cn(className)} {...props} />
}

// Card title
export const CardTitle = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.CardTitle>) => {
    return <ShaCard.CardTitle className={cn(className)} {...props} />
}

// Card description
export const CardDescription = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.CardDescription>) => {
    return <ShaCard.CardDescription className={cn(className)} {...props} />
}

// Card content
export const CardContent = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.CardContent>) => {
    return <ShaCard.CardContent className={cn(className)} {...props} />
}

// Card footer
export const CardFooter = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.CardFooter>) => {
    return <ShaCard.CardFooter className={cn(className)} {...props} />
}

export const CardAction = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaCard.CardAction>) => {
    return <ShaCard.CardAction className={cn(className)} {...props} />
}
