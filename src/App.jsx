import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Provincia from './components/pages/Provincia';
import { motion } from 'framer-motion';
import Catamarca from './components/pages/Catamarca';
import Hospedaje from './components/pages/Hospedaje';

function App() {
  return (
    <Router>
      <Navbar />
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
              <Provincia />
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
              <Catamarca />
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
              <Hospedaje />
            </motion.div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


