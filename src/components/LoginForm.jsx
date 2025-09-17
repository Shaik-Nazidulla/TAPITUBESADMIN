import React, { useState } from 'react'

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation (replace with actual authentication logic later)
    if (formData.email === 'admin@tapitubes.com' && formData.password === 'admin123') {
      onLogin()
      setError('')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </span>
            Sign In
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
          <div className="text-sm text-gray-600 text-center space-y-1">
            <p className="font-semibold text-gray-700">Demo Credentials:</p>
            <p className="flex items-center justify-center space-x-2">
              <span className="font-mono text-xs bg-white px-2 py-1 rounded">admin@tapitubes.com</span>
            </p>
            <p className="flex items-center justify-center space-x-2">
              <span className="font-mono text-xs bg-white px-2 py-1 rounded">admin123</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm