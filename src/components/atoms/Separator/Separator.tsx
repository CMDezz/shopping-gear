import { Separator as ShaSeparator } from "@shadcn-ui/separator";
import { cn } from "@libs/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SeparatorProps
  extends React.ComponentProps<typeof ShaSeparator> {}

export const Separator = ({ className, ...props }: SeparatorProps) => {
  return <ShaSeparator className={cn(className)} {...props} />;
};
