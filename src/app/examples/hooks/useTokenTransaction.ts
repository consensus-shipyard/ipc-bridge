import { useState, useEffect } from 'react'
import { useAccount, useBalance, useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, parseEther } from 'viem'
import { Address } from '../types'

export const useTokenTransaction = (tokenAddress: Address, to: Address, amount: string, showToast: Function) => {
  const { address } = useAccount()
  const { data: balanceData } = useBalance({
    token: tokenAddress,
    address,
  })

  // You can include validation and simulation logic here.
  const { data, writeContract } = useWriteContract()

  const {
    isLoading,
    error: txError,
    isSuccess: txSuccess,
  } = useWaitForTransactionReceipt({
    hash: data,
  })

  useEffect(() => {
    if (txSuccess) showToast(`Transaction successful`, { type: 'success' })
    else if (txError) showToast(`Transaction failed: ${txError.cause}`, { type: 'error' })
  }, [txSuccess, txError])

  const handleSendTransaction = () => {
    // Transaction logic
  }

  return {
    balanceData,
    handleSendTransaction,
    isLoading,
    txError,
    txSuccess,
  }
}
