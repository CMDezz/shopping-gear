import * as ShaSelect from "@shadcn-ui/select";
import { cn } from "@/libs/utils/cn";

// Main Select container
export const Select = ({
  ...props
}: React.ComponentProps<typeof ShaSelect.Select>) => (
  <ShaSelect.Select {...props} />
);

// Subcomponents
export const SelectTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectTrigger>) => (
  <ShaSelect.SelectTrigger className={cn(className)} {...props} />
);

export const SelectContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectContent>) => (
  <ShaSelect.SelectContent className={cn(className)} {...props} />
);

export const SelectGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectGroup>) => (
  <ShaSelect.SelectGroup className={cn(className)} {...props} />
);

export const SelectItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectItem>) => (
  <ShaSelect.SelectItem className={cn(className)} {...props} />
);

export const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectLabel>) => (
  <ShaSelect.SelectLabel className={cn(className)} {...props} />
);

export const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectSeparator>) => (
  <ShaSelect.SelectSeparator className={cn(className)} {...props} />
);

export const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectScrollUpButton>) => (
  <ShaSelect.SelectScrollUpButton className={cn(className)} {...props} />
);

export const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectScrollDownButton>) => (
  <ShaSelect.SelectScrollDownButton className={cn(className)} {...props} />
);

export const SelectValue = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaSelect.SelectValue>) => (
  <ShaSelect.SelectValue className={cn(className)} {...props} />
);
