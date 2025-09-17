import React from "react";

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 text-center py-16">
        <div className="mx-auto h-24 w-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <div className="text-gray-500 text-xl font-semibold mb-2">
          No products added yet
        </div>
        <p className="text-gray-400">
          Click "Add New Product" to showcase your catalog
        </p>
      </div>
    );
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Main Image */}
          {product.mainImage ? (
            <img
              src={
                typeof product.mainImage === "string"
                  ? product.mainImage
                  : URL.createObjectURL(product.mainImage)
              }
              alt={product.name}
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="h-40 w-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-gray-400">
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>

            {product.benefits && (
              <p className="text-sm text-green-600 mb-2">
                <span className="font-semibold">Benefits:</span>{" "}
                {product.benefits}
              </p>
            )}

            {product.applications && (
              <p className="text-sm text-blue-600 mb-2">
                <span className="font-semibold">Applications:</span>{" "}
                {product.applications}
              </p>
            )}

            {/* Extra Images */}
            {product.extraImages && product.extraImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {product.extraImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={typeof img === "string" ? img : URL.createObjectURL(img)}
                    alt={`Extra ${idx + 1}`}
                    className="h-12 w-12 object-cover rounded-md border border-gray-200"
                  />
                ))}
              </div>
            )}

            {/* Created Date */}
            <p className="text-xs text-gray-400 mt-3">
              Created: {product.createdAt}
            </p>

            {/* Actions */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => onEdit(product)}
                className="px-3 py-1 text-sm font-semibold text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id, product.name)}
                className="px-3 py-1 text-sm font-semibold text-red-600 hover:text-red-900 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
