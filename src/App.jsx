// App.jsx
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/UI/ThemeToggle";

import SplashScreen from "./components/SplashScreen";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSplashComplete = () => {
    setIsLoading(false);
  };
  return (
    <ThemeProvider>
      <main
        className={`min-h-screen flex-0 transition-all duration-300 ease-in-out dark:bg-gray-900`}
        style={{
          marginLeft: sidebarOpen ? 240 : 5,
        }}
      >
        <Router>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <>
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                <AppRoutes />
                <ThemeToggle />
              </>
            )}
          </AnimatePresence>
        </Router>
      </main>
    </ThemeProvider>
  );
}

export default App;
