import type { JSX, PropsWithChildren } from "react";
import Navbar from "../components/Navbar/Navbar";
//import Dashboard from "../components/Dashboard/Dashboard";

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
