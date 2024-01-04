import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { Web3ReactProvider } from '@web3-react/core'
import { connectors } from './connectors/index.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Web3ReactProvider connectors={connectors}>
        <App />
      </Web3ReactProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
