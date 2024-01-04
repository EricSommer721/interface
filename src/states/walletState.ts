import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Connection, ConnectionType } from '../connectors'

export enum ActivationStatus {
  PENDING,
  ERROR,
  IDLE,
}

type ActivationPendingState = {
  status: ActivationStatus.PENDING
  connection: Connection
}

type ActivationErrorState = {
  status: ActivationStatus.ERROR
  connection: Connection
  error: unknown
}

export const IDLE_ACTIVATION_STATE = { status: ActivationStatus.IDLE } as const

type ActivationState =
  | ActivationPendingState
  | ActivationErrorState
  | typeof IDLE_ACTIVATION_STATE

type Store = {
  wallet: Wallet
  setWallet: (wallet: Wallet) => void
  activationState: ActivationState
  setActivationState: (state: ActivationState) => void
}

type Wallet = ConnectionType | undefined

export const useWalletStore = create<Store>()(
  persist(
    (set) => ({
      activationState: IDLE_ACTIVATION_STATE,
      setActivationState: (state: ActivationState) =>
        set({ activationState: state }),
      wallet: undefined,
      setWallet: (wallet) => set({ wallet: wallet }),
    }),
    {
      name: 'wallet_type',
      partialize: (state) => ({
        wallet: state.wallet,
      }),
    },
  ),
)
