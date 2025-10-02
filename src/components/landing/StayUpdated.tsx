import PrimaryButton from '@/reuseableComponents/PrimaryButton'
import React from 'react'
import Wrapper from '../layout/Wrapper'

const StayUpdated = () => {
  return (
    <div className="py-10 xl:py-20">
      <Wrapper>
        <div className='bg-background-secondary min-h-[400px] sm:min-h-[450px] lg:h-[500px] grid place-content-center rounded-xl border-2 border-accent-foreground px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-0'>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-3xl mx-auto w-full">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
              Stay Updated with <span className='text-accent'>DTF Destash</span>
            </h2>
            
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 px-4 sm:px-0">
              Get notified about new live events, trending products, and exclusive deals
            </p>
            
            {/* Input and Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <input 
                type="email" 
                placeholder='Enter your email here' 
                className='bg-primary-foreground w-full sm:w-80 md:w-96 py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base transition-all'
              />
              <PrimaryButton 
                type='Primary' 
                title='Subscribe' 
                className='py-3 sm:py-3.5 lg:py-6 px-6 sm:px-8 whitespace-nowrap text-sm sm:text-base'
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default StayUpdated