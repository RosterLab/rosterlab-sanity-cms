'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Thank you for your submission! We\'ll be in touch soon.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        })
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-[#2d3bea] outline-none transition-colors text-lg"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-[#2d3bea] outline-none transition-colors text-lg"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-[#2d3bea] outline-none transition-colors text-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-[#2d3bea] outline-none transition-colors text-lg"
          required
        />
      </div>
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleInputChange}
        className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-[#2d3bea] outline-none transition-colors text-lg"
        required
      />
      <textarea
        name="message"
        placeholder="Message (optional)"
        value={formData.message}
        onChange={handleInputChange}
        rows={4}
        className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-[#2d3bea] outline-none transition-colors resize-none text-lg"
      />
      <div className="text-center pt-8">
        <button
          type="submit"
          className="px-12 py-4 bg-[#24d9dc] text-white font-bold text-xl rounded-full hover:bg-[#1ec5c8] transition-all duration-300 transform hover:scale-105"
        >
          Submit
        </button>
      </div>
    </form>
  )
}