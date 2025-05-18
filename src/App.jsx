import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Provincia from "./pages/Provincia";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Catamarca from "./pages/Catamarca";
import Tinogasta from "./pages/Tinogasta";
import Hospedaje from "./pages/Hospedaje";
import Footer from "./pages/Footer";
import "@radix-ui/themes/styles.css";
import Antofagasta from "./pages/Antofagasta";
import Fiambala from "./pages/Fiambala";


const App = () => {
  return (
    <>
      <header className="shadow">
        <Navbar />
      </header>
      <main className="min-h-screen">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/provincia" element={<Provincia />} />
            <Route path="/catamarca" element={<Catamarca />} />
            <Route path="/tinogasta" element={<Tinogasta />} />
            <Route path="/hospedaje" element={<Hospedaje />} />
            <Route path="/antofagasta" element={<Antofagasta />} />
            <Route path="/fiambala" element={<Fiambala />} />
          </Routes>
          <footer className="">
            <Footer />
          </footer>
        </div>
      </main>
    </>
  );
};

export default App;
