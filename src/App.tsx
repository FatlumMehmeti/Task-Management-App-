import Navbar from "./Navbar/Navbar";
import "./App.css";
import type { JSX } from "react";

export default function App(): JSX.Element {
  return (
    <>
      <Navbar />
    </>
  );
  // if(currentPage === "dashboard") {
  //   <DashboardLayout />
  // }
  // if(currentPage === "board") {
  //   <BoardLayout />
  // }
}
