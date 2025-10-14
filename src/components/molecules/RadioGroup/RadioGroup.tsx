import * as ShaRadioGroup from "@shadcn-ui/radio-group";
import { cn } from "@/libs/utils/cn";

// Main RadioGroup container
export const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaRadioGroup.RadioGroup>) => (
  <ShaRadioGroup.RadioGroup className={cn(className)} {...props} />
);

// RadioGroup Item
export const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaRadioGroup.RadioGroupItem>) => (
  <ShaRadioGroup.RadioGroupItem className={cn(className)} {...props} />
);
