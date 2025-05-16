
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LoadingAnimation from './components/LoadingAnimation'

// Add custom styles for the loading/loaded states
const style = document.createElement('style');
style.innerHTML = `
  body.loading {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  
  body.loading #root {
    display: none;
  }
  
  body.loaded #root {
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

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
