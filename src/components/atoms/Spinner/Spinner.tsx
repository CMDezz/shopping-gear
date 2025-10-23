import { Spinner as ShaSpinner } from "@shadcn-ui/spinner";
import { cn } from "@lib/core/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SpinnerProps extends React.ComponentProps<typeof ShaSpinner> {}

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return <ShaSpinner className={cn(className)} {...props} />;
};
