
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BackToTop from './components/BackToTop.tsx'

// Create the container element for BackToTop
const backToTopContainer = document.createElement('div');
document.body.appendChild(backToTopContainer);

// Render the main app
createRoot(document.getElementById("root")!).render(<App />);

// Render the BackToTop component
createRoot(backToTopContainer).render(<BackToTop />);
