'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react'

const SwitchThemeButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null;

  return (
    <div className="flex items-center gap-1.5">
      {/* Toggle Switch */}
      <button
        className={`relative inline-flex h-3.5 w-7 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${theme == "dark" ? 'bg-brand-blue' : 'bg-brand-border'}`}
        aria-label="Toggle dark mode"
        role="switch"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-checked={theme === "dark"}
      >
        <span
          className={`inline-block size-2 transform rounded-full bg-white transition-transform ${
            theme === "dark" ? 'translate-x-4' : 'translate-x-1'
          }`}
        />
      </button>

      <span 
        className="cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme == "dark" ? <svg className='w-4.25 h-4.5' xmlns="http://www.w3.org/2000/svg" width={17} height={18} viewBox="0 0 24 24" fill="none">
          <path d="M12 2.99994C12.132 2.99994 12.263 2.99994 12.393 2.99994C11.1084 4.19365 10.2826 5.79979 10.0593 7.53916C9.83602 9.27854 10.2293 11.0412 11.1708 12.5207C12.1122 14.0002 13.5424 15.103 15.2126 15.6374C16.8829 16.1718 18.6876 16.1041 20.313 15.4459C19.6878 16.9504 18.6658 18.257 17.3562 19.2262C16.0466 20.1954 14.4985 20.791 12.8769 20.9493C11.2554 21.1077 9.62129 20.8229 8.14892 20.1253C6.67654 19.4278 5.42114 18.3436 4.51661 16.9885C3.61209 15.6334 3.09238 14.0582 3.01291 12.4309C2.93345 10.8036 3.29721 9.18524 4.0654 7.74846C4.83359 6.31167 5.97739 5.11037 7.37479 4.27268C8.77219 3.43499 10.3708 2.99234 12 2.99194V2.99994Z" stroke="#DEE2E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun-icon lucide-sun w-4.25 h-4.5"><circle cx={12} cy={12} r={4} /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>}
      </span>
    </div>
  )
}

export default SwitchThemeButton

