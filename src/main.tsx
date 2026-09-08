import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App  from './App.tsx'
import './global.css'

import { FirebaseConexao } from './firebase/FirebaseConexao.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const client_ID = "909737096924-kur7k0uhm1ndusuq1j2nl3qk1enmhvu5.apps.googleusercontent.com"

const root = document.getElementById('root')

if (root) {

  createRoot(root).render(
    <StrictMode>
      <FirebaseConexao />
      <GoogleOAuthProvider clientId={client_ID}>
        <App />
      </GoogleOAuthProvider >
    </StrictMode>,
  )

} else {
  console.error("Elemento 'root' não encontrado no DOM.");
}
