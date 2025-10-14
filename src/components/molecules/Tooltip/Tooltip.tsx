import * as ShaTooltip from "@shadcn-ui/tooltip";
import { cn } from "@/libs/utils/cn";

export const Tooltip = ({
  ...props
}: React.ComponentProps<typeof ShaTooltip.Tooltip>) => (
  <ShaTooltip.Tooltip {...props} />
);

export const TooltipTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaTooltip.TooltipTrigger>) => (
  <ShaTooltip.TooltipTrigger className={cn(className)} {...props} />
);

export const TooltipContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaTooltip.TooltipContent>) => (
  <ShaTooltip.TooltipContent className={cn(className)} {...props} />
);

export const TooltipProvider = ({
  ...props
}: React.ComponentProps<typeof ShaTooltip.TooltipProvider>) => (
  <ShaTooltip.TooltipProvider {...props} />
);
