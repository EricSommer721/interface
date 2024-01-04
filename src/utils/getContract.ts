import { Signer } from '@ethersproject/abstract-signer'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, Provider } from '@ethersproject/providers'
import { getAddress } from '@ethersproject/address'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

export function getContract(
  address: string,
  ABI: any,
  provider: JsonRpcProvider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(provider, account) as any,
  )
}

// account is optional
function getProviderOrSigner(
  provider: JsonRpcProvider,
  account?: string,
): Provider | Signer {
  return account ? provider.getSigner(account).connectUnchecked() : provider
}
