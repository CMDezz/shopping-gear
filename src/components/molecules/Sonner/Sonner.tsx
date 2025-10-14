import { Toaster as ShaToaster } from "@shadcn-ui/sonner";
import { cn } from "@libs/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SonnerProps extends React.ComponentProps<typeof ShaToaster> {}

export const Toaster = ({ className, ...props }: SonnerProps) => {
  return <ShaToaster className={cn(className)} {...props} />;
};
