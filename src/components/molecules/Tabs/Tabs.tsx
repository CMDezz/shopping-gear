import * as ShaTabs from "@shadcn-ui/tabs";
import { cn } from "@/libs/utils/cn";

export const Tabs = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaTabs.Tabs>) => (
  <ShaTabs.Tabs className={cn(className)} {...props} />
);

export const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaTabs.TabsList>) => (
  <ShaTabs.TabsList className={cn(className)} {...props} />
);

export const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaTabs.TabsTrigger>) => (
  <ShaTabs.TabsTrigger className={cn(className)} {...props} />
);

export const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaTabs.TabsContent>) => (
  <ShaTabs.TabsContent className={cn(className)} {...props} />
);
