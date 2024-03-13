import React from 'react'
import TokenImage from '@/assets/icons/token.png' // Ensure proper path

type BalanceDisplayProps = {
  balanceData: {
    decimals: number
    formatted: string
    symbol: string
    value: bigint
  } | null
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balanceData }) => (
  <div className='stats shadow join-item m-2 p-8 bg-[#282c33]'>
    <div className='stat'>
      {balanceData && balanceData.formatted ? (
        <>
          <div className='stat-figure text-secondary'>
            <img className='opacity-25 ml-10' width={50} src={TokenImage.src} alt='token' />
          </div>
          <div className='stat-title text-gray-200'>Your balance</div>
          <div className='stat-value text-lg w-[150px]'>{`${balanceData.formatted} ${balanceData.symbol}`}</div>
        </>
      ) : (
        <>
          <div className='stat-title'>Your balance</div>
          <div className='stat-value text-lg w-[150px]'>Loading...</div>
        </>
      )}
    </div>
  </div>
)

export default BalanceDisplay
