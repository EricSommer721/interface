import { Connection, getConnection } from '../connectors'
import { didUserReject } from '../utils'
import { useCallback, useEffect } from 'react'
import {
  ActivationStatus,
  IDLE_ACTIVATION_STATE,
  useWalletStore,
} from '../states/walletState'
import { Connector } from '@web3-react/types'

function useTryActivation() {
  const [setActivationState, setWallet] = useWalletStore((state) => [
    state.setActivationState,
    state.setWallet,
  ])

  return useCallback(async (connection: Connection, onSuccess: () => void) => {
    // Skips wallet connection if the connection should override the default
    // behavior, i.e. install MetaMask or launch Coinbase app
    if (connection.overrideActivate?.()) return

    try {
      setActivationState({ status: ActivationStatus.PENDING, connection })

      console.debug(`Connection activating: ${connection.name}`)
      await connection.connector.activate()

      console.debug(`Connection activated: ${connection.name}`)
      setWallet(connection.type)

      // Clears pending connection state
      setActivationState(IDLE_ACTIVATION_STATE)

      onSuccess()
    } catch (error) {
      // Gracefully handles errors from the user rejecting a connection attempt
      if (didUserReject(connection, error)) {
        setActivationState(IDLE_ACTIVATION_STATE)
        return
      }

      // TODO(WEB-1859): re-add special treatment for already-pending injected errors & move debug to after didUserReject() check
      console.debug(`Connection failed: ${connection.name}`)
      console.error(error)

      setActivationState({ status: ActivationStatus.ERROR, connection, error })
    }
  }, [])
}

function useCancelActivation() {
  const [activationState, setActivationState] = useWalletStore((state) => [
    state.activationState,
    state.setActivationState,
  ])
  return () => {
    if (activationState.status !== ActivationStatus.IDLE)
      activationState.connection.connector.deactivate?.()
    setActivationState(IDLE_ACTIVATION_STATE)
  }
}

export function useConnectWallet() {
  const activationState = useWalletStore((state) => state.activationState)
  const tryActivation = useTryActivation()
  const cancelActivation = useCancelActivation()
  return { tryActivation, activationState, cancelActivation }
}

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

// attempt to connect eagerly on mount
export function useEagerlyConnect() {
  const [wallet, setWallet] = useWalletStore((state) => [
    state.wallet,
    state.setWallet,
  ])

  let selectedConnection: Connection | undefined

  if (wallet) {
    try {
      selectedConnection = getConnection(wallet)
    } catch {
      setWallet(undefined)
    }
  }

  useEffect(() => {
    if (selectedConnection) {
      connect(selectedConnection.connector)
    } // The dependency list is empty so this is only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
