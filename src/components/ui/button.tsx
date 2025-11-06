import { ReactNode } from "react";

export const buttonVariants = {
  primary: "bg-[#4058b5] text-white hover:bg-indigo-700 transition-colors ease-in cursor-pointer",
  secondary: "bg-[#7da2dd] text-white hover:bg-indigo-500 transition-colors cursor-pointer",
  danger: "bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer",
  outline: "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer",
} as const;

export const buttonSizes = {
  sm: "text-sm py-1.5 px-3 rounded-lg",
  md: "text-base py-2 px-4 rounded-lg", 
  lg: "text-lg py-2.5 px-6 rounded-xl font-normal",
} as const;

type VariantType = keyof typeof buttonVariants;
type SizeType = keyof typeof buttonSizes;

export interface ButtonProps {
  variant: VariantType;
  innerText: string;
  size: SizeType;
  icon?: ReactNode;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  const { 
    variant, 
    innerText, 
    size, 
    icon, 
    onClick,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`
        ${buttonVariants[variant]} 
        ${buttonSizes[size]} 
        inline-flex items-center justify-center gap-2 
        whitespace-nowrap shadow-sm`}
    >
      {icon && (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      )}
      <span>{innerText}</span>
    </button>
  );
};