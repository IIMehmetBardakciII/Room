import { cn } from "@/utils/cn";

type ButtonProps = {
  buttonColor: "blue" | "green";
  text: string;
  buttonType: "default" | "ghost";
  className?: string;
};

const buttonStyles = {
  default: {
    blue: "bg-defaultBlue text-white hover:bg-hoverBlue",
    green: "bg-defaultGreen text-white hover:bg-hoverGreen",
  },
  ghost: {
    blue: "bg-transparent border text-defaultBlue border-defaultBlue hover:bg-hoverBlue hover:text-white",
    green:
      "bg-transparent border text-defaultGreen border-defaultGreen hover:bg-hoverGreen hover:text-white",
  },
};

const Button = ({ buttonColor, buttonType, text, className }: ButtonProps) => {
  const buttonClass = buttonStyles[buttonType][buttonColor];

  return (
    <button
      className={cn(
        `px-4 py-[10px] max-sm:px-1 max-sm:py-[2px] rounded-[5px]`,
        buttonClass,
        className
      )}
    >
      <p className="max-sm:text-[12px]">{text}</p>
    </button>
  );
};

export default Button;
