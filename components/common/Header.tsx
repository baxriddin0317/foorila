import React from 'react'
import SwitchThemeButton from './SwitchThemeButton'

const Header = () => {
  return (
    <header className="bg-white dark:bg-black flex items-center justify-between w-full border-b border-brand-border px-1 py-0.5">
        <div>
            <span className="text-xs leading-6 dark:text-white text-black font-bold">ProductPeter.com 🤖</span>
            <span className='text-[13px] leading-6 dark:text-brand-secondary text-black'> ~/Product, AI<span className='hidden sm:inline-block'>, Market Trends</span></span>
        </div>
        <SwitchThemeButton />
    </header>
  )
}

export default Header