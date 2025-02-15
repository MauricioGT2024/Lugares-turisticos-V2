import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';

function App() {
  const LazyProvincia = lazy(() => import('./components/pages/Provincia'));
  const LazyCatamarca = lazy(() => import('./components/pages/Catamarca'));
  const LazyHospedaje = lazy(() => import('./components/pages/Hospedaje'));

  return (
    <Router>
      <Navbar />
      <LazyLoading redirectPath="/otra-ruta">
      </LazyLoading>

        <Routes>
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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


