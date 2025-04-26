// components/ui/checkbox.tsx
import { Checkbox as CheckboxPrimitive } from "@radix-ui/react-checkbox";
import { cn } from "../../lib/utils";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox = ({ checked, onCheckedChange, className }: CheckboxProps) => {
  return (
    <CheckboxPrimitive
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600",
        className
      )}
    />
  );
};

export { Checkbox };
