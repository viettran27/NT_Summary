import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from './constants/routes.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<App />}>
            {
              routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))
            }
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
