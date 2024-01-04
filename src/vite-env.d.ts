/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    // set by the Coinbase Wallet mobile dapp browser
    isCoinbaseWallet?: true
    // set by the MetaMask browser extension (also set by Brave browser when using built-in wallet)
    isMetaMask?: true
    on: (event: string, callback: () => void) => void
    removeListener: (event: string, callback: () => void) => void
  }
}
