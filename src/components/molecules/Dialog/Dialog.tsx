import * as ShaDialog from "@shadcn-ui/dialog";
import { cn } from "@/libs/utils/cn";

export const Dialog = ({
  ...props
}: React.ComponentProps<typeof ShaDialog.Dialog>) => (
  <ShaDialog.Dialog {...props} />
);

export const DialogTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogTrigger>) => (
  <ShaDialog.DialogTrigger className={cn(className)} {...props} />
);

export const DialogClose = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogClose>) => (
  <ShaDialog.DialogClose className={cn(className)} {...props} />
);

export const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogDescription>) => (
  <ShaDialog.DialogDescription className={cn(className)} {...props} />
);

export const DialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogOverlay>) => (
  <ShaDialog.DialogOverlay className={cn(className)} {...props} />
);

export const DialogPortal = ({
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogPortal>) => (
  <ShaDialog.DialogPortal {...props} />
);

export const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogTitle>) => (
  <ShaDialog.DialogTitle className={cn(className)} {...props} />
);

export const DialogContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogContent>) => (
  <ShaDialog.DialogContent className={cn(className)} {...props} />
);

export const DialogHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogHeader>) => (
  <ShaDialog.DialogHeader className={cn(className)} {...props} />
);

export const DialogFooter = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDialog.DialogFooter>) => (
  <ShaDialog.DialogFooter className={cn(className)} {...props} />
);
