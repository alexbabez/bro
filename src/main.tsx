import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import modern variable fonts
import '@fontsource-variable/inter'
import '@fontsource-variable/manrope'

createRoot(document.getElementById("root")!).render(<App />);
