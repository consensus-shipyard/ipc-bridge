import React from 'react'
import { isValidAddress } from '../utils/address'
import { Address } from '../types'

type TokenInputProps = {
  tokenAddress: Address
}

const TokenInput: React.FC<TokenInputProps> = ({ tokenAddress }) => {
  return (
    <div className='flex flex-col items-left space-y-4 mt-10'>
      <div>
        <label className='block text-sx font-medium text-gray-200 m-2'>Token Address:</label>
        <label className='block text-xs font-medium text-gray-400 m-4'> {tokenAddress}</label>
      </div>
    </div>
  )
}

export default TokenInput
