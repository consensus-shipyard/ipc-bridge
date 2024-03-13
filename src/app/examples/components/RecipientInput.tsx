import React, { useState, useEffect } from 'react'
import { isValidAddress } from '../utils/address'

type RecipientInputProps = {
  recipient: string
  onRecipientChange: (recipient: string) => void
}

const RecipientInput: React.FC<RecipientInputProps> = ({ recipient, onRecipientChange }) => {
  // Local state to determine if the recipient is valid
  const [isValidRecipient, setIsValidRecipient] = useState<boolean>(false)

  // Effect to validate recipient whenever it changes
  useEffect(() => {
    setIsValidRecipient(isValidAddress(recipient))
  }, [recipient])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRecipientChange(event.target.value)
  }

  return (
    <label className='form-control w-full max-w-xs'>
      <input
        type='hidden'
        placeholder='0x...'
        value={recipient || ''}
        className={`input input-bordered w-full max-w-xs ${!isValidRecipient && recipient !== '' ? 'input-error' : ''}`}
        onChange={handleChange}
      />
    </label>
  )
}

export default RecipientInput
