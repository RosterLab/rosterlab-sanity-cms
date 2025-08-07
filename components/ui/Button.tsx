'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { trackButtonClick } from '@/components/analytics/Amplitude'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  analyticsLabel?: string
  analyticsLocation?: string
  analyticsProperties?: Record<string, any>
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
  analyticsLabel,
  analyticsLocation,
  analyticsProperties,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  )

  const handleClick = () => {
    if (analyticsLabel) {
      trackButtonClick(
        analyticsLabel,
        analyticsLocation,
        {
          variant,
          size,
          href,
          ...analyticsProperties,
        }
      )
    }
    onClick?.()
  }

  if (href) {
    return (
      <Link 
        href={href} 
        className={classes}
        onClick={analyticsLabel ? () => {
          trackButtonClick(
            analyticsLabel,
            analyticsLocation,
            {
              variant,
              size,
              href,
              ...analyticsProperties,
            }
          )
        } : undefined}
      >
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  )
}