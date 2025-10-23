import * as ShaPagination from "@shadcn-ui/pagination";
import { cn } from "@lib/core/utils";

export const Pagination = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.Pagination>) => (
  <ShaPagination.Pagination className={cn(className)} {...props} />
);

export const PaginationItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.PaginationItem>) => (
  <ShaPagination.PaginationItem className={cn(className)} {...props} />
);

export const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.PaginationNext>) => (
  <ShaPagination.PaginationNext className={cn(className)} {...props} />
);

export const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.PaginationPrevious>) => (
  <ShaPagination.PaginationPrevious className={cn(className)} {...props} />
);

export const PaginationContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.PaginationContent>) => (
  <ShaPagination.PaginationContent className={cn(className)} {...props} />
);
export const PaginationLink = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.PaginationLink>) => (
  <ShaPagination.PaginationLink className={cn(className)} {...props} />
);
export const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<typeof ShaPagination.PaginationEllipsis>) => (
  <ShaPagination.PaginationEllipsis className={cn(className)} {...props} />
);
