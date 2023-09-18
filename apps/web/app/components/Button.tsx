import { Link } from "@remix-run/react";
import clsx from "clsx";

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    sms: "relative overflow-hidden bg-sms-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-sms-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-sms-900 hover:bg-white/90 active:bg-white/90 active:text-sms-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
};

type VariantKey = keyof typeof variantStyles;
type ColorKey<Variant extends VariantKey> =
  keyof (typeof variantStyles)[Variant];

type ButtonProps<
  Variant extends VariantKey,
  Color extends ColorKey<Variant>,
> = {
  variant?: Variant;
  color?: Color;
} & (
  | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
  | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
      to?: undefined;
    })
);

export function Button<
  Color extends ColorKey<Variant>,
  Variant extends VariantKey = "solid",
>({ variant, color, className, ...props }: ButtonProps<Variant, Color>) {
  variant = variant ?? ("solid" as Variant);
  color = color ?? ("gray" as Color);

  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return typeof props.to === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
}
