import SendToken from './SendToken.tsx'
import SendTokenUp from './SendTokenUp.tsx'

export default function Home() {
  return (
    <>
      <div className='flex-column align-center '>
        <div className='flex w-full'>
          <div className='flex p-10 w-1/2 card bg-slate-950 rounded-box place-items-center'>
            <SendToken />
          </div>
          <div className='divider divider-horizontal'></div>
          <div className='flex p-10 w-1/2 card bg-slate-950 rounded-box place-items-center'>
            <SendTokenUp />
          </div>
        </div>
      </div>
    </>
  )
}
