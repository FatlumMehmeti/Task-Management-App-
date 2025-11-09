import Navbar from "./Navbar/Navbar";
import BoardPage from './components/board/BoardPage'
import "./App.css";
import type { JSX } from "react";

export default function App(): JSX.Element {
  return (
    <>
      <Navbar />
      {/* <BoardPage /> */} <div className="style" style={{width: 100, height: 100, backgroundColor: "white"}}>fjolaa</div>
    </>
  );
  //  if(currentPage === "dashboard") {
  //   <DashboardLayout />
  // }
  // if(currentPage === "board") {
  //   <BoardLayout />
  // }
}

