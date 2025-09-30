import PrimaryButton from '@/reuseableComponents/PrimaryButton'
import React from 'react'
import Wrapper from '../layout/Wrapper'

const StayUpdated = () => {
  return (
    <div className="py-10">
    <Wrapper>
    <div className='bg-background-secondary h-[500px] grid place-content-center rounded-xl border-2 border-accent-foreground'>
        <div className="space-y-5">
        <h2>Stay Updated with <span className='text-accent'>DTF Destash</span></h2>
        <p>Get notified about new live events, trending products, and exclusive deal</p>
        <div className="flex items-center justify-center gap-4">
            <input type="text" placeholder='Enter your email here' className='bg-primary-foreground w-96  py-3 px-6 rounded-xl border'/>
            <PrimaryButton type='Primary' title='Subscribe' className='py-6'/>
        </div>
        </div>
    </div>
    </Wrapper>
    </div>
  )
}

export default StayUpdated
