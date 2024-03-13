import DepositFunds from './DepositFunds'
import WithdrawFunds from './WithdrawFunds'
export default function Home() {
  return (
    <>
      <div className='flex-column align-center '>
        <div className='flex w-full'>
          <div className='flex p-10 card bg-slate-950 rounded-box place-items-stretch'>
            <DepositFunds />
          </div>
          <div className='divider divider-horizontal'></div>
          <div className='flex p-10 card bg-slate-950 rounded-box place-items-stretch'>
            <WithdrawFunds />
          </div>
        </div>
      </div>
    </>
  )
}
