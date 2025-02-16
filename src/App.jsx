import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import Error404 from './pages/Error404'
import Footer from "./pages/Footer";
import About from "./pages/About";

function App() {
  const LazyProvincia = lazy(() => import("./pages/Provincia"));
  const LazyCatamarca = lazy(() => import("./pages/Catamarca"));
  const LazyHospedaje = lazy(() => import("./pages/Hospedaje"));
  const LazyHome = lazy(() => import("./pages/Home"));
  const LazyFiambala = lazy(() => import("./pages/Fiambala"))

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route
            path="/about"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <About/>
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Error404/>
              </motion.div>
            }
          />
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LazyHome />
              </motion.div>
            }
          />
          <Route
            path="/provincia"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LazyProvincia />
              </motion.div>
            }
          />
          <Route
            path="/catamarca"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LazyCatamarca />
              </motion.div>
            }
          />
          <Route
            path="/hospedaje"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LazyHospedaje />
              </motion.div>
            }
          />
          <Route
            path="/fiambala"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LazyFiambala/>
              </motion.div>
            }
          />
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  );
}

export default App;
