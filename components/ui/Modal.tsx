import React from 'react'

interface ModalProps {
  children: React.ReactElement
  style?: React.CSSProperties
}

export default function Modal({ children, style }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4"
        style={style}
      >
        {children}
      </div>
    </div>
  )
}