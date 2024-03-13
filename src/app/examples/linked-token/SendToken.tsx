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

export default function SendToken() {
  const { address } = useAccount()
  const chainId = useChainId()
  const [tokenAddress, setTokenAddress] = useState('0x721823209A298d4685142bebbbBF02d8907Eae17') // TODO get from config
  const [to, setTo] = useState()
  const [amount, setAmount] = useState('0')
  const [allowance, setAllowance] = useState('0')

  const { open: openModal } = useWeb3Modal()

  const { showToast } = useToast()
  const contractAddress = '0xCcbF0c7799667323E52b4cAc41a9be5275e4EaF9' // TODO get from config

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

  if (chainId == 314159) {
    return (
      <div className='flex-column align-center'>
        <H1 title='Deposit Linked ERC-20 Token' />
        <TokenInput tokenAddress={tokenAddress} />
        {tokenAddress && (
          <>
            <RecipientInput onRecipientChange={setTo} recipient={to} />
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
          Connect to Calibration Network
        </button>
      </div>
    )
  }
}
