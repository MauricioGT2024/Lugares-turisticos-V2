import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import LoadingSpinner from './components/Screen/LoadingSpinner';
import Error404 from './pages/Error404';
import Footer from './pages/Footer';
import About from './pages/About';
import SplashScreen from './components/Screen/SplashScreen';
import { pageTransition } from './config/transitions';
import PropTypes from 'prop-types';

// Lazy imports
const LazyTinogasta = lazy(() => import('./pages/Tinogasta'));
const LazyAntofagasta = lazy(() => import('./pages/Antofagasta'));
const LazyHome = lazy(() => import('./pages/Home'));
const LazyProvincia = lazy(() => import('./pages/Provincia'));
const LazyCatamarca = lazy(() => import('./pages/Catamarca'));
const LazyHospedaje = lazy(() => import('./pages/Hospedaje'));
const LazyFiambala = lazy(() => import('./pages/Fiambala'));

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
	return (
		<React.Suspense fallback={<LoadingSpinner />}>{children}</React.Suspense>
	);
};

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
};

// ScrollToTop Component
const ScrollToTop = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [location.pathname]);

	return null;
};

// AppContent Component
function AppContent() {
	const location = useLocation();

	return (
		<ErrorBoundary>
			<Suspense fallback={<LoadingSpinner />}>
				<ScrollToTop />
				<Navbar />
				<motion.main
					key={location.pathname}
					initial='initial'
					animate='animate'
					exit='exit'
					variants={pageTransition}
					className='min-h-screen'
				>
					<AnimatePresence mode='wait'>
						<Routes location={location} key={location.pathname}>
							<Route
								path='/'
								element={
									<motion.div {...pageTransition}>
										<LazyHome />
									</motion.div>
								}
							/>
							<Route
								path='/tinogasta'
								element={
									<motion.div {...pageTransition}>
										<LazyTinogasta />
									</motion.div>
								}
							/>
							<Route
								path='/antofagasta'
								element={
									<motion.div {...pageTransition}>
										<LazyAntofagasta />
									</motion.div>
								}
							/>
							<Route
								path='/about'
								element={
									<motion.div {...pageTransition}>
										<About />
									</motion.div>
								}
							/>
							<Route
								path='/provincia'
								element={
									<motion.div {...pageTransition}>
										<LazyProvincia />
									</motion.div>
								}
							/>
							<Route
								path='/catamarca'
								element={
									<motion.div {...pageTransition}>
										<LazyCatamarca />
									</motion.div>
								}
							/>
							<Route
								path='/hospedaje'
								element={
									<motion.div {...pageTransition}>
										<LazyHospedaje />
									</motion.div>
								}
							/>
							<Route
								path='/fiambala'
								element={
									<motion.div {...pageTransition}>
										<LazyFiambala />
									</motion.div>
								}
							/>
							<Route
								path='*'
								element={
									<motion.div {...pageTransition}>
										<Error404 />
									</motion.div>
								}
							/>
						</Routes>
					</AnimatePresence>
				</motion.main>
			</Suspense>

			<Footer />
		</ErrorBoundary>
	);
}

// App Component
function App() {
	const [showSplash, setShowSplash] = useState(true);

	return (
		<Router>
			<AnimatePresence mode='wait'>
				{showSplash ? (
					<SplashScreen onComplete={() => setShowSplash(false)} />
				) : (
					<AppContent />
				)}
			</AnimatePresence>
		</Router>
	);
}

export default App;
