'use client'
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

type TokenAmountInputProps = {
  onAmountChange: (amount: string) => void
  balanceData: any
}

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({ balanceData, onAmountChange }) => {
  const [amount, setAmount] = useState('')
  const [sliderValue, setSliderValue] = useState(0)

  const balance = balanceData ? balanceData.value : 0
  const tokenDigits = balanceData ? balanceData.decimals : 0
  const symbol = balanceData ? balanceData.symbol : ''

  const maxAmount = Number(balance) / Math.pow(10, tokenDigits)

  useEffect(() => {
    onAmountChange(amount)
  }, [amount, onAmountChange])

  const handleSliderChange = (value: number) => {
    const newAmount = (BigInt(value) * balance) / BigInt(100)

    console.log('AMOUNT', newAmount)
    setAmount(newAmount)
    setSliderValue(value)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue <= maxAmount) {
      setAmount(value)
      setSliderValue((numValue / maxAmount) * 100)
    }
  }

  if (balance == 0) {
    return <></>
  }
  return (
    <>
      <div className='flex flex-col items-center space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-200 m-2'>Amount to transfer:</label>
          <div className='flex rounded-md shadow-sm m-2'>
            <input
              type='text'
              value={amount ? ethers.formatUnits(amount, tokenDigits) : 0}
              placeholder='Amount'
              className='input input-bordered w-full max-w-xs rounded-r-none text-gray-300'
              onChange={handleAmountChange}
            />
            <span className='inline-flex items-center px-3 rounded-r-md border border-l-0 input-bordered bg-gray-850 text-gray-300 text-sm'>
              {symbol}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center m-2'>
        <input
          type='range'
          min='0'
          max='100'
          value={sliderValue}
          className='range range-xs'
          step='1'
          onChange={(e) => handleSliderChange(Number(e.target.value))}
        />
        <output className='px-2'>{`${sliderValue}%`}</output>
      </div>
    </>
  )
}

export default TokenAmountInput
