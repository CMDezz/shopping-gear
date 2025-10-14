import { Label as ShaLabel } from "@shadcn-ui/label";
import { cn } from "@libs/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LabelProps extends React.ComponentProps<typeof ShaLabel> {}

export const Label = ({ className, ...props }: LabelProps) => {
  return <ShaLabel className={cn(className)} {...props} />;
};
