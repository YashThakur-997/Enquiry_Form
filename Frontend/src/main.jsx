import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeInit } from '../.flowbite-react/init.tsx';
import './index.css'
import Form from './form.jsx';
import 'sweetalert2/src/sweetalert2.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeInit />
    <Form/>
  </StrictMode>,
)
