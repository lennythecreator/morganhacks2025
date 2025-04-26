// components/ui/button.tsx
import { ReactNode } from "react";
import { cn } from "classnames"; // Assuming you're using classnames utility

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  [x: string]: any; // For any other props you want to pass to the button
}

const Button = ({ children, className, type = "button", ...props }: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full h-12 text-base font-medium",
        "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700",
        "transition-all duration-300 ease-out",
        className
      )}
      {...props} // Spread additional props like `disabled` or `onClick`
    >
      {children}
    </button>
  );
};

export default Button;
