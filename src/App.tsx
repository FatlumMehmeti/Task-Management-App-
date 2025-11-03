import React from "react";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors">
      <Navbar />
    </div>
  );
};

export default App;
