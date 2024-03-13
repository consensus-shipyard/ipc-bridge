import React from 'react'

type ButtonProps = {
  isLoading: boolean
  isDisabled: boolean
  onClick: () => void
  text: string
}

const Button: React.FC<ButtonProps> = ({ isLoading, isDisabled, onClick, text }) => (
  <button className='btn mt-5 btn-wide w-[100%]' onClick={onClick} disabled={isDisabled}>
    {isLoading ? <span className='loading loading-dots loading-sm'></span> : text}
  </button>
)

export default Button
