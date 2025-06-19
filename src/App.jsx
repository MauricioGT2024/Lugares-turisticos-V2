// App.jsx
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

import SplashScreen from "./components/SplashScreen";
import AppRoutes from "./routes/AppRoutes";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // detectar al inicio
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };
  return (
    <main
      className={`min-h-screen flex-0 transition-all duration-300 ease-in-out `}
      style={{
        marginLeft:
          !isMobile && sidebarOpen ? "1rem" : !isMobile ? "3rem" : "0",
      }}
    >
      <ThemeProvider>
        <Router>
          <AnimatePresence mode="sync">
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
      </ThemeProvider>
    </main>
  );
}

export default App;
