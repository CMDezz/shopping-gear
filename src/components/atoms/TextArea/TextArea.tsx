import { Textarea as ShaTextarea } from "@shadcn-ui/textarea";
import { cn } from "@lib/core/utils/cn";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextAreaProps
  extends React.ComponentProps<typeof ShaTextarea> {}

export const TextArea = ({ className, ...props }: TextAreaProps) => {
  return <ShaTextarea className={cn(className)} {...props} />;
};
