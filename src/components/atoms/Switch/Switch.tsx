import { Switch as ShaSwitch } from "@shadcn-ui/switch";
import { cn } from "@libs/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SwitchProps extends React.ComponentProps<typeof ShaSwitch> {}

export const Switch = ({ className, ...props }: SwitchProps) => {
  return <ShaSwitch className={cn(className)} {...props} />;
};
