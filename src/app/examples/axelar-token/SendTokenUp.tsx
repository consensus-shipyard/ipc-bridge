// page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import H1 from '../components/H1'
import TokenInput from '../components/TokenInput'
import RecipientInput from '../components/RecipientInput'
import Button from '../components/Button'
import BalanceDisplay from '../components/BalanceDisplay'
import TokenAmountInput from '../components/TokenAmountInput'
import { useAccount, useWriteContract, useSimulateContract, useWaitForTransactionReceipt, useContractRead } from 'wagmi'
import { useToast } from '@/context/Toaster'
import { useBalance } from 'wagmi'
import { ethers } from 'ethers'
import { parseAbi } from 'viem'
import { erc20Abi } from 'viem'

import { useChainId } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const sendLinkedTokenAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'linkedTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export default function SendTokenUp() {
  const { address } = useAccount()
  const chainId = useChainId()
  const { open: openModal } = useWeb3Modal()
  const [tokenAddress, setTokenAddress] = useState('0x427eD285e9d0662D4859a891499Fe3614CC8F7D1') // TODO get from config
  const [to, setTo] = useState()
  const [amount, setAmount] = useState('0')

  const { showToast } = useToast()
  const contractAddress = '0x427eD285e9d0662D4859a891499Fe3614CC8F7D1' // TODO get from config

  const tokenDigits = 18 // TODO get from config

  const contractCallArgs = {
    address: contractAddress,
    abi: sendLinkedTokenAbi,
    functionName: 'linkedTransfer',
    args: [to!, amount],
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

  if (chainId == 2443544213400835) {
    // TODO get from config
    return (
      <div className='flex-column align-center'>
        <H1 title='Withdraw Linked ERC-20 Token' />
        <TokenInput />
        {tokenAddress && (
          <>
            <RecipientInput onRecipientChange={setTo} recipient={to} />
            <BalanceDisplay balanceData={balanceData} />
            <TokenAmountInput balanceData={balanceData} onAmountChange={setAmount} />
            <Button
              text='Withdraw tokens'
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
        <H1 title='Withdraw Linked ERC-20 Token' />
        <button className='btn mt-10 btn-wide w-[100%]' onClick={() => openModal({ view: 'Networks' })}>
          Connect to IPC Network
        </button>
      </div>
    )
  }
}
