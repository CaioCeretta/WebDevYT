import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["", "transition-colors"], { 
  variants: {
    variant: {
      default: ['bg-secondary', 'hover:bg-secondary-hover'],
      ghost: ['bg-gray-100'],
      dark: ['bg-secondary-dark', 'hover:bg-secondary-dark-hover', 'text-secondary']
    },
    size: {
      default: ['rounded', 'p-2'],
      icon: ['rounded-full', 'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'p-2.5', 'mx-2' ],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});
 
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>

/*twMerge resolve conflicts on the default classes and the classes that are passed through the props making sure
both perfectly work, we just need to choose which one we are passing first, because it may override the others*/

export default function Button({variant, size, className, ...props}: ButtonProps) {
  return <button {...props}  className={twMerge(buttonStyles({variant, size}), className)}/>
}
