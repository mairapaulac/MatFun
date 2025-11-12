// components/ui/loading-button.tsx
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
}

export function LoadingButton({
  isLoading = false,
  loadingText,
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("relative transition-all duration-200", className)}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner className="mr-2 size-4" />
          {loadingText || children}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}