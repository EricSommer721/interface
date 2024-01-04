import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation
}

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: [
      'https://eth-mainnet.g.alchemy.com/v2/demo',
      'https://ethereum.publicnode.com',
      'https://cloudflare-eth.com',
    ],
    name: 'Mainnet',
  },
  10: {
    urls: ['https://optimism.publicnode.com', 'https://mainnet.optimism.io'],
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  324: {
    urls: [
      'https://mainnet.era.zksync.io',
      'https://zksync-era.blockpi.network/v1/rpc/public',
    ],
    name: 'zkSync Mainnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://explorer.zksync.io'],
  },
  42161: {
    urls: ['https://rpc.ankr.com/arbitrum', 'https://arb1.arbitrum.io/rpc'],
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  137: {
    urls: ['https://rpc.ankr.com/polygon', 'https://polygon-rpc.com'],
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
}
