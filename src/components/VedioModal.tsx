import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { VideoLink } from '../constants/links'

export function VideoModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean
  onOpenChange: () => void
}) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      classNames={{
        body: 'py-6',
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'bg-transparent shadow-none',
      }}
    >
      <ModalContent className="p-4">
        <ModalBody>
          <video
            src={VideoLink}
            loop
            muted
            autoPlay
            className="w-full h-full rounded"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
