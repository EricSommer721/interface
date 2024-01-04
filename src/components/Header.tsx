import { Button, useDisclosure } from '@nextui-org/react'
import { useWeb3React } from '@web3-react/core'
import { WalletModal } from '../components/WalletModal'
import { useEagerlyConnect } from '../hooks/useConnectWallet'
import { getShortAddress } from '../utils'

export function Header() {
  const { account } = useWeb3React()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  // attempt to connect eagerly on mount
  useEagerlyConnect()

  return (
    <div>
      <header className="flex flex-col p-4">
        <WalletModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <div className="ml-auto">
          {account ? (
            <span>{getShortAddress(account)}</span>
          ) : (
            <Button color="primary" className="ml-auto" onClick={onOpen}>
              Connect
            </Button>
          )}
        </div>
      </header>
    </div>
  )
}
