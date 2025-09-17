import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import Blogs from './pages/Blogs'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && <Header onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/products" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/products" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Products />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/blogs" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Blogs />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/products" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App