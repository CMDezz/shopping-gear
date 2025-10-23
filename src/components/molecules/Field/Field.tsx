import * as ShaField from "@shadcn-ui/field";
import { cn } from "@lib/core/utils";

export const Field = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.Field>) => (
  <ShaField.Field className={cn(className)} {...props} />
);

export const FieldLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldLabel>) => (
  <ShaField.FieldLabel className={cn(className)} {...props} />
);

export const FieldError = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldError>) => (
  <ShaField.FieldError className={cn(className)} {...props} />
);

export const FieldDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldDescription>) => (
  <ShaField.FieldDescription className={cn(className)} {...props} />
);

export const ForFieldErrormField = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldError>) => (
  <ShaField.FieldError className={cn(className)} {...props} />
);

export const FieldGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldGroup>) => (
  <ShaField.FieldGroup className={cn(className)} {...props} />
);

export const FieldLegend = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldLegend>) => (
  <ShaField.FieldLegend className={cn(className)} {...props} />
);

export const FieldSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldSeparator>) => (
  <ShaField.FieldSeparator className={cn(className)} {...props} />
);

export const FieldSet = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldSet>) => (
  <ShaField.FieldSet className={cn(className)} {...props} />
);

export const FieldContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldContent>) => (
  <ShaField.FieldContent className={cn(className)} {...props} />
);

export const FieldTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaField.FieldTitle>) => (
  <ShaField.FieldTitle className={cn(className)} {...props} />
);
