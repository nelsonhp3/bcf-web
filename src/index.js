import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { TooltipProvider } from './components/ui/tooltip'
import { BcfContextProvider } from './context/bcf-context'
// import { AppContextProvider } from './context/app-context'
// import { UserContextProvider } from './context/user-context'
// import { BcfContextProvider } from './context/bcf-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <TooltipProvider delayDuration={0}>
      <BcfContextProvider>
        <App />
      </BcfContextProvider>
    </TooltipProvider>
  </React.StrictMode>
)
