import type { JSX, PropsWithChildren } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function AppLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <>
      <Navbar />
      <main className="main-content">{children}</main>
    </>
  );
}
