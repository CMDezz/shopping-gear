import { Input as ShaInput } from "@shadcn-ui/input";
import { cn } from "@libs/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.ComponentProps<typeof ShaInput> {}

export const Input = ({ className, ...props }: InputProps) => {
  return <ShaInput className={cn(className)} {...props} />;
};
