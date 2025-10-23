import * as ShaCollapsible from "@shadcn-ui/collapsible";
import { cn } from "@lib/core/utils";

export const Collapsible = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCollapsible.Collapsible>) => (
  <ShaCollapsible.Collapsible className={cn(className)} {...props} />
);

export const CollapsibleTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCollapsible.CollapsibleTrigger>) => (
  <ShaCollapsible.CollapsibleTrigger className={cn(className)} {...props} />
);

export const CollapsibleContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCollapsible.CollapsibleContent>) => (
  <ShaCollapsible.CollapsibleContent className={cn(className)} {...props} />
);
