import { Button as ShaButton } from '@shadcn-ui/button'
import { cn } from '@/lib/utils/cn'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ButtonProps extends React.ComponentProps<typeof ShaButton> {}

export const Button = ({ className, ...props }: ButtonProps) => {
    return <ShaButton className={cn(className)} {...props} />
}
