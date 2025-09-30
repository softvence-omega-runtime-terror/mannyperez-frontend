import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/types";

const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  onClick,
  type,
  className = "",
}) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 px-5 py-6 font-medium  capitalize rounded-xl focus:outline-none text-lg cursor-pointer ${
        type === "Primary"
          ? "bg-accent text-card"
          : type === "Outline" 
          ? "text-accent bg-accent-foreground border border-accent"
          : type === "Badge"
          ? "text-dark-Blue bg-light-Gray text-sm  px-4 py-1 rounded-bl-full rounded-tl-full rounded-tr-full rounded-br-full"
          : type === "Icon"
          ? " text-light-Gray size-12 rounded-full border border-light-Gray p-3"  
          : ""
      }  ${className}`}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {title && <span>{title}</span>}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </Button>
  );
};

export default PrimaryButton;