import React, { useState } from 'react'
import ProductForm from '../Components/ProductForm'
import ProductList from '../Components/ProductList'
import Header from '../Components/Header'

function Products() {
  const [products, setProducts] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleAddProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toLocaleDateString()
    }
    setProducts([...products, newProduct])
    setIsFormOpen(false)
  }

  const handleEditProduct = (productData) => {
    setProducts(products.map(product => 
      product.id === editingProduct.id 
        ? { ...productData, id: editingProduct.id, createdAt: editingProduct.createdAt }
        : product
    ))
    setEditingProduct(null)
    setIsFormOpen(false)
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const openEditForm = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header with animated gradient */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Our Products
            </h1>
            <p className="text-gray-600">Manage your product catalog with ease</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Product</span>
          </button>
        </div>

        {isFormOpen && (
          <div className="mb-8 transform transition-all duration-300 ease-in-out">
            <ProductForm
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
              onCancel={closeForm}
              initialData={editingProduct}
              isEditing={!!editingProduct}
            />
          </div>
        )}

        <div className="transform transition-all duration-300">
          <ProductList
            products={products}
            onEdit={openEditForm}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Products