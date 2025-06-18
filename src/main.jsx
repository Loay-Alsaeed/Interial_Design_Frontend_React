import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DesignProvider } from "./context/DesignContext"; // حسب مكان الملف
import { AuthProvider } from "./context/AuthContext"; // حسب مكان الملف
import { StyleProvider } from './context/StyleContext.jsx';
import { CategoryProvider } from './context/CategoryContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DesignProvider>
        <StyleProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </StyleProvider>
      </DesignProvider>  
    </AuthProvider>  
  </StrictMode>
)
