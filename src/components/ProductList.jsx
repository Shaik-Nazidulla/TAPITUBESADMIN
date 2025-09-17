import React from 'react'

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 text-center py-16">
        <div className="mx-auto h-24 w-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="text-gray-500 text-xl font-semibold mb-2">No products added yet</div>
        <p className="text-gray-400">Click "Add New Product" to get started with your inventory</p>
      </div>
    )
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id)
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl overflow-hidden rounded-2xl border border-gray-200/50">
      <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200/50">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span>Products ({products.length})</span>
        </h3>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200/30">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-blue-50/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    <span className="text-green-600">${product.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      product.inStock 
                        ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' 
                        : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                    {product.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="text-red-600 hover:text-red-900 font-semibold transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList