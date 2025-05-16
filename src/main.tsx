
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LoadingAnimation from './components/LoadingAnimation'

// Add loading class to body
document.body.classList.add('loading');

// Create container for the loading animation
const loadingRoot = document.createElement('div');
loadingRoot.id = 'loading-root';
document.body.appendChild(loadingRoot);

// Render the loading animation
createRoot(loadingRoot).render(<LoadingAnimation />);

// Render the main app
createRoot(document.getElementById("root")!).render(<App />);

