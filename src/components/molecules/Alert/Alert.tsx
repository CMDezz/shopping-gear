import * as ShaAlert from "@shadcn-ui/alert";
import { cn } from "@/libs/utils/cn";

export const Alert = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaAlert.Alert>) => (
  <ShaAlert.Alert className={cn(className)} {...props} />
);

export const AlertTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaAlert.AlertTitle>) => (
  <ShaAlert.AlertTitle className={cn(className)} {...props} />
);

export const AlertDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaAlert.AlertDescription>) => (
  <ShaAlert.AlertDescription className={cn(className)} {...props} />
);
