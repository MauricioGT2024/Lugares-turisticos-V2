// App.jsx
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import SplashScreen from './components/SplashScreen';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
	const [showSplash, setShowSplash] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<main
			className={`flex-0 transition-all duration-300 ease-in-out`}
			style={{
				marginLeft: sidebarOpen ? 240 : 5, // 240px abierto, 48px cerrado
			}}
		>
			<Router>
				<Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

				<AnimatePresence mode='wait'>
					{showSplash ? (
						<SplashScreen onComplete={() => setShowSplash(false)} />
					) : (
						<AppRoutes />
					)}
				</AnimatePresence>
			</Router>
		</main>
	);
}

export default App;
