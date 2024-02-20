import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TooltipProvider } from './components/ui/tooltip'
import './index.css'
import { BcfContextProvider } from 'context/bcf-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <TooltipProvider delayDuration={0}>
    <BcfContextProvider>
      <App />
    </BcfContextProvider>
  </TooltipProvider>
  // </React.StrictMode>
)
