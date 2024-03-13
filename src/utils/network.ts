import { defineChain } from 'viem'

const ipcChain = defineChain({
  blockExplorers: { default: { name: 'TBD', url: 'https://place.holder.com' } }, // TODO determine how to load network with a null Block Explorer
  rpcUrls: {
    default: {
      http: ['http://localhost:8010/proxy'], // need cors proxy
      // lcp --proxyUrl http://localhost:8745
    },
  },
  testnet: true,
  name: 'IPC Subnet',
  nativeCurrency: {
    decimals: 18,
    name: 'IPC',
    symbol: 'IPC',
  },
  id: 2175508586850951,
  // TODO chain id in config
})

import { filecoinCalibration, polygonMumbai, localhost, Chain } from 'viem/chains'

let chains = [filecoinCalibration, polygonMumbai, ipcChain] as [Chain, ...Chain[]]
console.log('Chains', chains)

export const ETH_CHAINS = chains

export function GetNetworkColor(chain?: string) {
  if (chain === 'homestead') return 'green'
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'

  return 'grey'
}
