import React, { useState } from "react";

function ProductList({ products, onEdit, onDelete }) {
  const [expandedSection, setExpandedSection] = useState({});
  const [currentMainImages, setCurrentMainImages] = useState({}); // { [productId]: "description" | "benefits" | "applications" }

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
              d="M20 7l-8-4-8 4m16 0l-8 4m0-10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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

  const handleImageClick = (productId, imgSrc) => {
  setCurrentMainImages((prev) => ({
    ...prev,
    [productId]: imgSrc,
  }));
};

  return (
    <div className="space-y-6">
      {products.map((product) => {
        const mainImage =
           product.mainImage instanceof File
            ? URL.createObjectURL(product.mainImage)
            : product.mainImage.url; 

        const activeSection =
          expandedSection[product.id] || "description"; // default = description

        return (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="p-4 flex flex-col items-center border-r border-gray-100">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="h-48 w-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center text-gray-400 rounded-lg mb-3">
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

                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                  {product.name}
                </h3>

                {/* Extra Images */}
                {product.extraImages?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {product.extraImages?.map((img, idx) => {
                      const imgSrc =
                        img instanceof File ? URL.createObjectURL(img) : img.url || img;
                      return (
                        <img
                          key={idx}
                          src={imgSrc}
                          alt={`Extra ${idx + 1}`}
                          className={`h-12 w-12 object-cover rounded-md border cursor-pointer hover:ring-2 hover:ring-indigo-400 ${
                            imgSrc === mainImage ? "ring-2 ring-indigo-500" : ""
                          }`}
                          onClick={() => handleImageClick(product.id, imgSrc)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Side */}
              <div className="p-6 flex flex-col justify-between">
                {/* Tabs */}
                <div className="flex space-x-4 border-b mb-4">
                  <button
                    className={`pb-2 text-sm font-medium ${
                      activeSection === "description"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() =>
                      setExpandedSection({ ...expandedSection, [product.id]: "description" })
                    }
                  >
                    Description
                  </button>
                  <button
                    className={`pb-2 text-sm font-medium ${
                      activeSection === "benefits"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() =>
                      setExpandedSection({ ...expandedSection, [product.id]: "benefits" })
                    }
                  >
                    Benefits
                  </button>
                  <button
                    className={`pb-2 text-sm font-medium ${
                      activeSection === "applications"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() =>
                      setExpandedSection({ ...expandedSection, [product.id]: "applications" })
                    }
                  >
                    Applications
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-sm text-gray-700">
                  {activeSection === "description" && (
                    <p>{product.description}</p>
                  )}

                  {activeSection === "benefits" && (
                    <ul className="list-disc list-inside space-y-1">
                      {product.benefits?.map((b, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{b.point}:</span>{" "}
                          {b.description}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeSection === "applications" && (
                    <ul className="list-disc list-inside space-y-1">
                      {product.applications?.map((a, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{a.point}:</span>{" "}
                          {a.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-xs text-gray-400">
                    Created: {product.createdAt}
                  </p>
                  <div className="flex space-x-4">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
