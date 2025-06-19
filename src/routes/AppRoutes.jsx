// AppRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import Error404 from "../pages/Error404";
import About from "../pages/About";
import ScrollToTop from "./ScrollToTop";

// Lazy imports de páginas
const LazyTinogasta = lazy(() => import("../pages/Tinogasta"));
const LazyAntofagasta = lazy(() => import("../pages/Antofagasta"));
const LazyHome = lazy(() => import("../pages/Home"));
const LazyProvincia = lazy(() => import("../pages/Provincia"));
const LazyCatamarca = lazy(() => import("../pages/Catamarca"));
const LazyHospedaje = lazy(() => import("../pages/Hospedaje"));
const LazyFiambala = lazy(() => import("../pages/Fiambala"));
const LazyDepartamento = lazy(() => import("../pages/Departamento"));

const pageTransition = {
  initial: {
    opacity: 0,
    y: 15,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      mass: 0.8,
      damping: 15,
      stiffness: 80,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: "blur(5px)",
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {/* Controla el scroll al cambiar de ruta */}
      <ScrollToTop />

      {/* Barra de navegación */}

      {/* Suspense para el lazy loading */}
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/tinogasta"
              element={
                <motion.div {...pageTransition}>
                  <LazyTinogasta />
                </motion.div>
              }
            />
            <Route
              path="/antofagasta"
              element={
                <motion.div {...pageTransition}>
                  <LazyAntofagasta />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div {...pageTransition}>
                  <About />
                </motion.div>
              }
            />
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <LazyHome />
                </motion.div>
              }
            />
            <Route
              path="/provincia"
              element={
                <motion.div {...pageTransition}>
                  <LazyProvincia />
                </motion.div>
              }
            />
            <Route
              path="/catamarca"
              element={
                <motion.div {...pageTransition}>
                  <LazyCatamarca />
                </motion.div>
              }
            />
            <Route
              path="/hospedaje"
              element={
                <motion.div {...pageTransition}>
                  <LazyHospedaje />
                </motion.div>
              }
            />
            <Route
              path="/fiambala"
              element={
                <motion.div {...pageTransition}>
                  <LazyFiambala />
                </motion.div>
              }
            />
            {/* La ruta comodín debe ir al final */}
            <Route
              path="*"
              element={
                <motion.div {...pageTransition}>
                  <Error404 />
                </motion.div>
              }
            />
            <Route
              path="/departamento/:nombre"
              element={
                <motion.div {...pageTransition}>
                  <LazyDepartamento />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default AppRoutes;
