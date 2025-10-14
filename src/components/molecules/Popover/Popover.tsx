import * as ShaPopover from "@shadcn-ui/popover";
import { cn } from "@/libs/utils/cn";

export const Popover = ({
  ...props
}: React.ComponentProps<typeof ShaPopover.Popover>) => (
  <ShaPopover.Popover {...props} />
);

export const PopoverTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPopover.PopoverTrigger>) => (
  <ShaPopover.PopoverTrigger className={cn(className)} {...props} />
);

export const PopoverContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPopover.PopoverContent>) => (
  <ShaPopover.PopoverContent className={cn(className)} {...props} />
);

export const PopoverAnchor = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPopover.PopoverAnchor>) => (
  <ShaPopover.PopoverAnchor className={cn(className)} {...props} />
);
