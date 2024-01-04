import { Modal, ModalContent } from '@nextui-org/react'
import { getConnections } from '../connectors'
import { WalletOption } from './WalletOption'

export function WalletModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: () => void
}) {
  const connections = getConnections()

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent className="p-4">
        {connections.map((connection) => (
          <WalletOption
            key={connection.name}
            connection={connection}
            onOpenChange={onOpenChange}
          />
        ))}
      </ModalContent>
    </Modal>
  )
}
