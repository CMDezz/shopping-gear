import * as ShaSheet from '@shadcn-ui/sheet'
import { cn } from '@/lib/utils'

export const Sheet = ({
    ...props
}: React.ComponentProps<typeof ShaSheet.Sheet>) => <ShaSheet.Sheet {...props} />

export const SheetTrigger = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetTrigger>) => (
    <ShaSheet.SheetTrigger className={cn(className)} {...props} />
)

export const SheetContent = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetContent>) => (
    <ShaSheet.SheetContent className={cn(className)} {...props} />
)

export const SheetHeader = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetHeader>) => (
    <ShaSheet.SheetHeader className={cn(className)} {...props} />
)

export const SheetFooter = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetFooter>) => (
    <ShaSheet.SheetFooter className={cn(className)} {...props} />
)
export const SheetClose = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetClose>) => (
    <ShaSheet.SheetClose className={cn(className)} {...props} />
)
export const SheetTitle = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetTitle>) => (
    <ShaSheet.SheetTitle className={cn(className)} {...props} />
)
export const SheetDescription = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaSheet.SheetDescription>) => (
    <ShaSheet.SheetDescription className={cn(className)} {...props} />
)
