import type { JSX, PropsWithChildren } from "react";
import "../pages/auth/Auth.css";

export default function AuthLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return <div className="auth-center">{children}</div>;
}
