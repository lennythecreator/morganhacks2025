// components/ui/label.tsx
interface LabelProps {
    htmlFor: string;
    className?: string;
    children: React.ReactNode;
  }
  
  const Label = ({ htmlFor, className, children }: LabelProps) => {
    return (
      <label
        htmlFor={htmlFor}
        className={cn("text-gray-600 font-medium leading-none", className)}
      >
        {children}
      </label>
    );
  };
  
  export { Label };
  