// components/ui/input.tsx
import { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils" // Utility function for combining classes

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "h-12 bg-white border-green-100 focus:border-green-300 focus:ring-green-200",
        className
      )}
    />
  );
};

export { Input };
