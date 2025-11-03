import type {
  ButtonHTMLAttributes,
  JSX,
  PropsWithChildren,
  ElementType,
  ReactNode,
} from "react";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    icon?: ElementType;
    endIcon?: ElementType;
    iconSize?: number;
    text?: ReactNode;
    size?: "sm" | "md" | "lg" | "icon";
  }
>;

export default function Button({
  children,
  className,
  disabled,
  loading,
  type = "button",
  icon: Icon,
  endIcon: EndIcon,
  iconSize = 16,
  text,
  size,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      {...rest}
      style={{
        ...(rest.style || {}),
        ...(size === "icon"
          ? {
              width: Math.max(iconSize + 12, 32),
              height: Math.max(iconSize + 12, 32),
              padding: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: (rest.style && (rest.style as any).color) || "#6b7280",
              background:
                (rest.style && (rest.style as any).background) || "transparent",
            }
          : undefined),
      }}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {Icon ? <Icon size={iconSize} /> : null}
          {text ? <span>{text}</span> : null}
          {children}
          {EndIcon ? <EndIcon size={iconSize} /> : null}
        </>
      )}
    </button>
  );
}
