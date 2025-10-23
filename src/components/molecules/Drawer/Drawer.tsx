import * as ShaDrawer from '@shadcn-ui/drawer'
import { cn } from '@/lib/utils'

export const Drawer = ({
    ...props
}: React.ComponentProps<typeof ShaDrawer.Drawer>) => (
    <ShaDrawer.Drawer {...props} />
)

export const DrawerTrigger = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerTrigger>) => (
    <ShaDrawer.DrawerTrigger className={cn(className)} {...props} />
)

export const DrawerPortal = ({
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerPortal>) => (
    <ShaDrawer.DrawerPortal {...props} />
)

export const DrawerOverlay = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerOverlay>) => (
    <ShaDrawer.DrawerOverlay className={cn(className)} {...props} />
)

export const DrawerClose = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerClose>) => (
    <ShaDrawer.DrawerClose className={cn(className)} {...props} />
)

export const DrawerTitle = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerTitle>) => (
    <ShaDrawer.DrawerTitle className={cn(className)} {...props} />
)

export const DrawerDescription = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerDescription>) => (
    <ShaDrawer.DrawerDescription className={cn(className)} {...props} />
)

export const DrawerContent = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerContent>) => (
    <ShaDrawer.DrawerContent className={cn(className)} {...props} />
)

export const DrawerHeader = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerHeader>) => (
    <ShaDrawer.DrawerHeader className={cn(className)} {...props} />
)

export const DrawerFooter = ({
    className,
    ...props
}: React.ComponentProps<typeof ShaDrawer.DrawerFooter>) => (
    <ShaDrawer.DrawerFooter className={cn(className)} {...props} />
)
