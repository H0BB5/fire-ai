import { Button, ButtonProps } from "@/components/ui/button";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  hidden?: boolean;
  disabled?: boolean;
  variant?: ButtonProps["variant"];
  type?: ButtonProps["type"];
  size?: ButtonProps["size"];
}

export const ActionButton = ({
  onClick,
  children,
  hidden,
  disabled,
  variant,
  size = "lg",
  type,
}: ActionButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      disabled={disabled}
      variant={variant}
      className={`select-none ${hidden ? "hidden" : ""} ${
        size === "icon" ? "h-11 w-11" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
