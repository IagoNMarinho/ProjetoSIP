import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App  from './App.tsx'
import './global.css'

import { GoogleOAuthProvider } from '@react-oauth/google'
const client_ID = "680419486027-1llq72i02d88gvva8crg43el4ap125vr.apps.googleusercontent.com"

const root = document.getElementById('root')

if (root) {

  createRoot(root).render(
    <StrictMode>
      <GoogleOAuthProvider clientId={client_ID}>
        <App />
      </GoogleOAuthProvider >
    </StrictMode>,
  )

} else {
  console.error("Elemento 'root' não encontrado no DOM.");
}
