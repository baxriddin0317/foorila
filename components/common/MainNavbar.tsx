'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

// Sample data for charts based on the image description
const generateChartData = (pattern: 'lcp' | 'inp' | 'ttfb' | 'uptime') => {
  const baseData = Array.from({ length: 30 }, (_, i) => ({ value: i }))
  
  switch (pattern) {
    case 'lcp':
      // High plateau, then gradual decline
      return baseData.map((_, i) => ({
        value: i < 10 ? 85 : Math.max(20, 85 - (i - 10) * 3)
      }))
    case 'inp':
      // Fluctuating pattern with peaks and valleys
      return baseData.map((_, i) => ({
        value: 30 + Math.sin(i * 0.5) * 25 + Math.cos(i * 0.3) * 15
      }))
    case 'ttfb':
      // Moderate height, relatively flat, then gradual decline
      return baseData.map((_, i) => ({
        value: i < 15 ? 60 : Math.max(25, 60 - (i - 15) * 2)
      }))
    case 'uptime':
      // Dynamic fluctuating pattern
      return baseData.map((_, i) => ({
        value: 50 + Math.sin(i * 0.4) * 30 + Math.cos(i * 0.6) * 20
      }))
    default:
      return baseData.map(() => ({ value: 50 }))
  }
}

const PerformanceMetric = ({ 
  title, 
  percentage, 
  isPositive, 
  chartData 
}: { 
  title: string
  percentage: string
  isPositive: boolean
  chartData: { value: number }[]
}) => {
  const gradientId = `gradient-${title.replace(/\s+/g, '-')}`
  
  return (
    <div className="border-b border-brand-border">
      <div className="flex flex-col items-start mb-0.75 pl-1 gap-0.5">
        <span className="text-xs dark:text-brand-secondary leading-4.5 text-black tracking-widest">{title}</span>
        <span className={`text-xs leading-4.5 px-1 h-4.5 italic ${
          isPositive 
            ? 'bg-brand-green text-white' 
            : 'bg-brand-red text-white'
        }`}>
          {percentage}
        </span>
      </div>
      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1077AA" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#1077AA" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1077AA"
              strokeWidth={1.5}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const MainNavbar = () => {
  const pathname = usePathname()
  const [timestamp, setTimestamp] = useState<string>('')

  const navItems = [
    { label: 'Blog Posts', href: '/blog' },
    { label: 'About Me', href: '/about' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' },
  ]

  const performanceMetrics = [
    {
      title: 'P75 LCP',
      percentage: '-8.76%',
      isPositive: false,
      chartData: generateChartData('lcp')
    },
    {
      title: 'P75 INP',
      percentage: '+29.78%',
      isPositive: true,
      chartData: generateChartData('inp')
    },
    {
      title: 'TTFB',
      percentage: '-19.38%',
      isPositive: false,
      chartData: generateChartData('ttfb')
    },
    {
      title: 'Uptime',
      percentage: '+22.17%',
      isPositive: true,
      chartData: generateChartData('uptime')
    },
  ]

  const formatTimestamp = () => {
    const now = new Date()
    const year = now.getFullYear().toString().slice(-2)
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}:${month}:${day}:${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    setTimestamp(formatTimestamp())
  }, [])

  return (
    <nav className="max-w-30 md:max-w-40 lg:max-w-70 xl:max-w-[320px]  flex flex-col h-[calc(100vh-30px)] w-full border-r border-brand-border bg-white dark:bg-black">
      {/* Navigation Links */}
      <div className="flex flex-col border-b border-brand-border">
        {navItems.map((item, index) => {
          const isActive = item.href === '/blog'
              ? (pathname === '/' || pathname.startsWith('/blog'))
              : (pathname === item.href || pathname.startsWith(item.href + '/'))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-1 text-sm font-bold transition-colors ${
                isActive
                  ? 'dark:text-brand-blue text-brand-blue'
                  : 'dark:text-white text-black hover:dark:text-brand-blue hover:text-brand-blue'
              } 
              ${index === navItems.length-1 ? '' : 'border-b border-brand-border'} `}
            >
              {item.label}»
            </Link>
          )
        })}
      </div>

      {/* Performance Metrics Charts */}
      <div className="overflow-y-auto">
        {performanceMetrics.map((metric) => (
          <PerformanceMetric
            key={metric.title}
            title={metric.title}
            percentage={metric.percentage}
            isPositive={metric.isPositive}
            chartData={metric.chartData}
          />
        ))}
      </div>

      {/* Last Deploy Timestamp */}
      <div className="p-1">
        <p className="text-[11px] dark:text-brand-secondary/75 text-black">
          <span className='font-bold text-xs'>Last Deploy Timestamp:</span> {timestamp}
        </p>
      </div>

      {/* Footer */}
      <div className='mt-auto border-t border-t-brand-border p-1 text-xs space-y-1'>
        <p className='dark:text-brand-secondary/75 text-black/75'>v0.10.5 · Made with ☕ + ♥️</p>
        <p className='flex gap-1 items-center dark:text-brand-secondary/75 text-black/75'>© 2026  <span className='text-black dark:text-white'>Peter Meng</span></p>
      </div>
    </nav>  
  )
}

export default MainNavbar