import React from 'react'
import { isValidAddress } from '../utils/address'
import { Address } from '../types'

type InputProps = {
  label: string
  value: any
  setValue: (value: any) => void
}

const Input: React.FC<InputProps> = ({ label, value, setValue }) => {
  return (
    <div className='flex flex-col items-left space-y-4 mt-10'>
      <div>
        <label className='block text-sx font-medium text-gray-200 m-2'>{label}</label>
      </div>
      <div>
        <label className='form-control w-full max-w-xs'>
          <input
            type='input'
            value={value || ''}
            className={`input input-bordered w-full max-w-xs`}
            onChange={setValue}
          />
        </label>
      </div>
    </div>
  )
}

export default Input
