import { Checkbox as ShaCheckbox } from "@shadcn-ui/checkbox";
import { cn } from "@/libs/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CheckboxProps
  extends React.ComponentProps<typeof ShaCheckbox> {}

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return <ShaCheckbox className={cn(className)} {...props} />;
};
