<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/index.css";
import App from './App.tsx'
=======
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./router";
import { Toaster } from "sonner";
import "./index.css";
>>>>>>> main

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
    <Toaster richColors position="top-center" />
  </React.StrictMode>
);
