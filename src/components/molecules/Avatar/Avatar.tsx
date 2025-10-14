import * as ShaAvatar from "@shadcn-ui/avatar";
import { cn } from "@/libs/utils/cn";

export const Avatar = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaAvatar.Avatar>) => (
  <ShaAvatar.Avatar className={cn(className)} {...props} />
);

export const AvatarImage = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaAvatar.AvatarImage>) => (
  <ShaAvatar.AvatarImage className={cn(className)} {...props} />
);

export const AvatarFallback = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaAvatar.AvatarFallback>) => (
  <ShaAvatar.AvatarFallback className={cn(className)} {...props} />
);
