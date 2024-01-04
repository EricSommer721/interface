import { Connection, ConnectionType } from '../connectors'

export const getIsInjected = Boolean(window.ethereum)

// https://eips.ethereum.org/EIPS/eip-1193#provider-errors
export enum ErrorCode {
  USER_REJECTED_REQUEST = 4001,
  UNAUTHORIZED = 4100,
  UNSUPPORTED_METHOD = 4200,
  DISCONNECTED = 4900,
  CHAIN_DISCONNECTED = 4901,

  // https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
  CHAIN_NOT_ADDED = 4902,
  MM_ALREADY_PENDING = -32002,

  WC_V2_MODAL_CLOSED = 'Error: Connection request reset. Please try again.',
  CB_REJECTED_REQUEST = 'Error: User denied account authorization',
}

// TODO(WEB-1973): merge this function with existing didUserReject for Swap errors
export function didUserReject(connection: Connection, error: any): boolean {
  return (
    error?.code === ErrorCode.USER_REJECTED_REQUEST ||
    (connection.type === ConnectionType.WALLET_CONNECT_V2 &&
      error?.toString?.() === ErrorCode.WC_V2_MODAL_CLOSED)
  )
}

export function getShortAddress(account: string) {
  return `${account.substring(0, 6)}...${account.substring(
    account.length - 4,
    account.length,
  )}`
}
