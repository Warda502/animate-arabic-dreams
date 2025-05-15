
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Pre-loading critical assets
const preloadImages = [
  "/lovable-uploads/46319556-27d1-46f3-b365-81927d12674f.png"
];

// Preload images
preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
