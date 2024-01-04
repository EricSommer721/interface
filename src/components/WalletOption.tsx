import { Connection } from '../connectors'
import { Spinner } from '@nextui-org/react'
import { ActivationStatus } from '../states/walletState'
import { useConnectWallet } from '../hooks/useConnectWallet'

export function WalletOption({
  connection,
  onOpenChange,
}: {
  connection: Connection
  onOpenChange: () => void
}) {
  const { activationState, tryActivation } = useConnectWallet()

  const activate = () => tryActivation(connection, onOpenChange)

  const isSomeOptionPending =
    activationState.status === ActivationStatus.PENDING
  const isCurrentOptionPending =
    isSomeOptionPending && activationState.connection.type === connection.type

  return (
    <div
      onClick={activate}
      className="flex relative flex-col items-center p-6 select-none cursor-pointer rounded-2xl hover:bg-[--div-hover-color]"
    >
      <img src={connection.image} alt="" className="w-[45px] h-[45px]" />
      <div className="text-xl font-semibold mt-3">{connection.name}</div>
      {isCurrentOptionPending && (
        <Spinner className="absolute right-4 top-12" />
      )}
    </div>
  )
}
