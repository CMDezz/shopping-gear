import * as ShaCommand from "@shadcn-ui/command";
import { cn } from "@lib/core/utils";

export const Command = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.Command>) => (
  <ShaCommand.Command className={cn(className)} {...props} />
);

export const CommandDialog = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandDialog>) => (
  <ShaCommand.CommandDialog className={cn(className)} {...props} />
);

export const CommandShortcut = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandShortcut>) => (
  <ShaCommand.CommandShortcut className={cn(className)} {...props} />
);

export const CommandSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandSeparator>) => (
  <ShaCommand.CommandSeparator className={cn(className)} {...props} />
);

export const CommandInput = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandInput>) => (
  <ShaCommand.CommandInput className={cn(className)} {...props} />
);

export const CommandList = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandList>) => (
  <ShaCommand.CommandList className={cn(className)} {...props} />
);

export const CommandEmpty = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandEmpty>) => (
  <ShaCommand.CommandEmpty className={cn(className)} {...props} />
);

export const CommandGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandGroup>) => (
  <ShaCommand.CommandGroup className={cn(className)} {...props} />
);

export const CommandItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaCommand.CommandItem>) => (
  <ShaCommand.CommandItem className={cn(className)} {...props} />
);
