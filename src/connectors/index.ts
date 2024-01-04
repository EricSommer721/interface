import { hooks as metaMaskHooks, metaMask, metamaskImage } from './MetaMask'
import { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import {
  hooks as walletConnectV2Hooks,
  walletConnectV2,
  walletConnectImage,
} from './WalletConnectV2'
import { Connector } from '@web3-react/types'
import { getIsInjected } from '../utils'

export enum ConnectionType {
  INJECTED = 'INJECTED',
  WALLET_CONNECT_V2 = 'WALLET_CONNECT_V2',
}

export interface Connection {
  image: string
  name: string
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
  overrideActivate?: () => void
}

export const connectors: [MetaMask | WalletConnectV2, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnectV2, walletConnectV2Hooks],
]

export function getConnections() {
  return [injectedConnection, walletConnectV2Connection]
}

const walletConnectV2Connection: Connection = {
  image: walletConnectImage,
  name: 'WalletConnect',
  connector: walletConnectV2,
  hooks: walletConnectV2Hooks,
  type: ConnectionType.WALLET_CONNECT_V2,
}

const injectedConnection: Connection = {
  image: metamaskImage,
  name: 'Metamask',
  connector: metaMask,
  hooks: metaMaskHooks,
  type: ConnectionType.INJECTED,
  // If on non-injected, non-mobile browser, prompt user to install Metamask
  overrideActivate: () => {
    if (!getIsInjected) {
      window.open('https://metamask.io/', 'inst_metamask')
      return true
    }
    return false
  },
}

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = getConnections().find(
      (connection) => connection.connector === c,
    )
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.WALLET_CONNECT_V2:
        return walletConnectV2Connection
    }
  }
}
