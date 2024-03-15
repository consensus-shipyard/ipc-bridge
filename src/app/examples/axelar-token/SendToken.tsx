// page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Allowance from '../components/Allowance'
import H1 from '../components/H1'
import BalanceDisplay from '../components/BalanceDisplay'
import Button from '../components/Button'
import RecipientInput from '../components/RecipientInput'
import TokenAmountInput from '../components/TokenAmountInput'
import TokenInput from '../components/TokenInput'
import Input from '../components/Input'
import { useAccount, useWriteContract, useSimulateContract, useWaitForTransactionReceipt, useContractRead } from 'wagmi'
import { useToast } from '@/context/Toaster'
import { useBalance } from 'wagmi'
import { ethers } from 'ethers'
import { parseAbi } from 'viem'
import { erc20Abi } from 'viem'
import { useChainId } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const fundSubnetAbi = [
  {
    type: 'function',
    name: 'fundSubnet',
    inputs: [
      {
        name: 'tokenId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'subnet',
        type: 'tuple',
        internalType: 'struct SubnetID',
        components: [
          {
            name: 'root',
            type: 'uint64',
            internalType: 'uint64',
          },
          {
            name: 'route',
            type: 'address[]',
            internalType: 'address[]',
          },
        ],
      },
      {
        name: 'recipient',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
]

export default function SendToken() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [tokenAddress, setTokenAddress] = useState(
    process.env.NEXT_PUBLIC_POLYGON_MUMBAI__ORIGIN_TOKEN_ADDRESS ?? false
  )
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_POLYGON_MUMBAI__TOKEN_SENDER_ADDRESS ?? false
  )

  const [axelarTokenId, setAxelarTokenId] = useState(process.env.NEXT_PUBLIC_AXELAR_TOKEN_ID ?? false)
  const [subnetAddress, setSubnetAddress] = useState(process.env.NEXT_PUBLIC_SUBNET_ADDRESS ?? false)
  const [gasPayment, setGasPayment] = useState(process.env.NEXT_PUBLIC_AXELAR_GAS_PAYMENT ?? false)
  const [subnetRoot, setSubnetRoot] = useState(process.env.NEXT_PUBLIC_SUBNET_ROOT ?? false)

  const subnetId = { root: subnetRoot, route: [subnetAddress] }

  console.log('env', process.env)
  console.log('token address', tokenAddress)

  const [to, setTo] = useState()
  const [amount, setAmount] = useState('0')
  const [allowance, setAllowance] = useState('0')

  const { open: openModal } = useWeb3Modal()

  const { showToast } = useToast()

  const contractCallArgs = {
    address: contractAddress,
    abi: fundSubnetAbi,
    functionName: 'fundSubnet',
    args: [axelarTokenId, subnetId, to, amount],
    value: gasPayment,
  }

  const { error: estimateError } = useSimulateContract(contractCallArgs)
  const { data, writeContract, isPending, error } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  const handleSendClick = async () => {
    writeContract(contractCallArgs)
  }

  const { data: balanceData } = useBalance({
    address: address,
    token: tokenAddress,
  })
  const tokenDigits = balanceData ? balanceData.decimals : 0

  useEffect(() => {
    setTo(address)
  }, [address])

  useEffect(() => {
    if (txSuccess) {
      showToast(`Transaction successful`, {
        type: 'success',
      })
    } else if (txError) {
      showToast(`Transaction failed: ${txError.cause}`, {
        type: 'error',
      })
    }
  }, [txSuccess, txError])

  if (tokenAddress === false || contractAddress === false || axelarTokenId === false) {
    return (
      <div className='flex-column align-center'>
        <H1 title='Configuration Error' />
        <div>Please provide the required environment variables.</div>
      </div>
    )
  }

  if (chainId == 80001) {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Axelar ERC-20 Token' />
        {tokenAddress && (
          <>
            <BalanceDisplay balanceData={balanceData} />
            <TokenAmountInput balanceData={balanceData} onAmountChange={setAmount} />
            <Allowance
              contractAddress={contractAddress}
              amount={amount}
              tokenAddress={tokenAddress}
              allowance={allowance}
              setAllowance={setAllowance}
              tokenDigits={tokenDigits}
            />
            <Button
              text='Send tokens'
              onClick={handleSendClick}
              isLoading={isPending}
              isDisabled={
                !to || !amount || amount === '0' || isPending || amount > ethers.parseUnits(allowance, tokenDigits)
              }
            />
          </>
        )}
      </div>
    )
  } else {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Linked ERC-20 Token' />
        <button className='btn mt-10 btn-wide w-[100%]' onClick={() => openModal({ view: 'Networks' })}>
          Connect to Polygon Mumbai Network
        </button>
      </div>
    )
  }
}
