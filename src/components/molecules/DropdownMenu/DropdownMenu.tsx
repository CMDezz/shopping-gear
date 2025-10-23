import * as ShaDropdownMenu from "@shadcn-ui/dropdown-menu";
import { cn } from "@lib/core/utils";

export const DropdownMenu = ({
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenu>) => (
  <ShaDropdownMenu.DropdownMenu {...props} />
);

export const DropdownMenuTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuTrigger>) => (
  <ShaDropdownMenu.DropdownMenuTrigger className={cn(className)} {...props} />
);

export const DropdownMenuPortal = ({
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuPortal>) => (
  <ShaDropdownMenu.DropdownMenuPortal {...props} />
);

export const DropdownMenuGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuGroup>) => (
  <ShaDropdownMenu.DropdownMenuGroup className={cn(className)} {...props} />
);

export const DropdownMenuCheckboxItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuCheckboxItem>) => (
  <ShaDropdownMenu.DropdownMenuCheckboxItem
    className={cn(className)}
    {...props}
  />
);

export const DropdownMenuRadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuRadioGroup>) => (
  <ShaDropdownMenu.DropdownMenuRadioGroup
    className={cn(className)}
    {...props}
  />
);

export const DropdownMenuRadioItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuRadioItem>) => (
  <ShaDropdownMenu.DropdownMenuRadioItem className={cn(className)} {...props} />
);

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuShortcut>) => (
  <ShaDropdownMenu.DropdownMenuShortcut className={cn(className)} {...props} />
);

export const DropdownMenuSub = ({
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuSub>) => (
  <ShaDropdownMenu.DropdownMenuSub {...props} />
);

export const DropdownMenuSubTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuSubTrigger>) => (
  <ShaDropdownMenu.DropdownMenuSubTrigger
    className={cn(className)}
    {...props}
  />
);

export const DropdownMenuSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuSubContent>) => (
  <ShaDropdownMenu.DropdownMenuSubContent
    className={cn(className)}
    {...props}
  />
);
export const DropdownMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuContent>) => (
  <ShaDropdownMenu.DropdownMenuContent className={cn(className)} {...props} />
);

export const DropdownMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuItem>) => (
  <ShaDropdownMenu.DropdownMenuItem className={cn(className)} {...props} />
);

export const DropdownMenuLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuLabel>) => (
  <ShaDropdownMenu.DropdownMenuLabel className={cn(className)} {...props} />
);

export const DropdownMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaDropdownMenu.DropdownMenuSeparator>) => (
  <ShaDropdownMenu.DropdownMenuSeparator className={cn(className)} {...props} />
);
