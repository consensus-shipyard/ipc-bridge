import { CardList } from '@/components/CardList'

import EtherIcon from '@/assets/icons/ethereum.png'
import TokenIcon from '@/assets/icons/token.png'

const ExampleItems = [
  {
    title: 'Fund Token based Subnet with Axelar ERC20 Token',
    description: 'Bridge a Mumbai based token to Filecoin Calibration and IPC subnet using Axelar',
    image: TokenIcon.src,
    url: '/examples/axelar-token',
  },
  {
    title: 'Manage Linked USDC Tokens',
    description: 'Send axelarUSDC tokens from Filecoin Calibration to the IPC Subnet using IPC Linked Token',
    image: EtherIcon.src,
    url: '/examples/linked-token',
  },
  {
    title: 'Send Funds between Subnets (Token)',
    description: 'Fund and withdraw Tokens from Ipc Subnet and Filecoin Calibration',
    image: EtherIcon.src,
    url: '/examples/deposit-token',
  },
  {
    title: 'Send Funds between Subnets (Native)',
    description: 'Fund and withdraw native tFIL from IPC subnet.',
    image: EtherIcon.src,
    url: '/examples/deposit-native',
  },
]

export default function Home() {
  return (
    <>
      <h2 className='text-xl'>IPC Subnet Token and Funding Tool </h2>

      <p className='mb-4'>
        Use the links below to fund subnets and bridge tokens using Axelar and IPC Message passing.
      </p>

      <CardList title='Examples' items={ExampleItems} />
    </>
  )
}
