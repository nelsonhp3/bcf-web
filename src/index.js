import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TooltipProvider } from './components/ui/tooltip'
import { BcfContextProvider } from 'context/bcf-context'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <TooltipProvider delayDuration={0}>
    <BcfContextProvider>
      <App />
    </BcfContextProvider>
  </TooltipProvider>
)
