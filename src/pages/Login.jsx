import React from 'react'
import LoginForm from '../components/LoginForm'

function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Tapi Tubes Admin
          </h2>
          <p className="text-blue-200 text-lg">
            Manage your products and content
          </p>
        </div>
        <LoginForm onLogin={onLogin} />
      </div>
      
      {/* Floating shapes for visual appeal */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"></div>
    </div>
  )
}

export default Login