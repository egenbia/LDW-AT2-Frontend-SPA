import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-150 ease-in outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // DESIGN: pílula preta, vira azul no hover, azul escuro ao clicar
        default:
          "rounded-full bg-black font-bold text-white hover:-translate-y-0.5 hover:bg-primary active:translate-y-0 active:bg-[#0155b7]",
        // DESIGN: borda azul, texto accent, hover preenchido de azul
        outline:
          "rounded-sm border-primary bg-background text-accent-foreground hover:bg-primary hover:text-white aria-expanded:bg-primary aria-expanded:text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        // DESIGN: ghost com tom azul
        ghost:
          "rounded-sm text-accent-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/20 aria-expanded:bg-primary/10",
        // DESIGN: vermelho sólido (antes era o estilo translúcido)
        destructive:
          "rounded-sm bg-destructive font-bold text-white hover:bg-destructive/90 focus-visible:border-destructive/40 focus-visible:ring-destructive/30",
        link: "text-accent-foreground underline-offset-4 hover:text-primary hover:underline",
      },
      size: {
        // DESIGN: padding 12px 24px (h-10 px-6)
        default:
          "h-10 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),12px)] px-3 text-sm in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-8 text-base has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-10",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-12",
      },
    },
    // DESIGN: garante a pílula no variant default em qualquer tamanho
    compoundVariants: [
      {
        variant: "default",
        size: ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
        class: "rounded-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }