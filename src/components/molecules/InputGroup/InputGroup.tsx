import * as ShaInputGroup from "@shadcn-ui/input-group";
import { cn } from "@/libs/utils/cn";

export const InputGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaInputGroup.InputGroup>) => (
  <ShaInputGroup.InputGroup className={cn(className)} {...props} />
);

export const InputGroupAddon = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaInputGroup.InputGroupAddon>) => (
  <ShaInputGroup.InputGroupAddon className={cn(className)} {...props} />
);

export const InputGroupButton = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaInputGroup.InputGroupButton>) => (
  <ShaInputGroup.InputGroupButton className={cn(className)} {...props} />
);

export const InputGroupText = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaInputGroup.InputGroupText>) => (
  <ShaInputGroup.InputGroupText className={cn(className)} {...props} />
);

export const InputGroupInput = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaInputGroup.InputGroupInput>) => (
  <ShaInputGroup.InputGroupInput className={cn(className)} {...props} />
);

export const InputGroupTextarea = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaInputGroup.InputGroupTextarea>) => (
  <ShaInputGroup.InputGroupTextarea className={cn(className)} {...props} />
);
