// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  clearAdminState,
  selectProductsAdmin,
  selectLoadingProducts,
  selectProductError,
  selectCreatingProduct,
  selectCreateProductError,
  selectUpdatingProduct,
  selectUpdateProductError,
  selectNewProduct,
  selectUpdatedProduct,
} from '../redux/productAdminSlice';

function Products() {
  const dispatch = useDispatch();

  // Redux state
  const products = useSelector(selectProductsAdmin);
  const loadingProducts = useSelector(selectLoadingProducts);
  const productError = useSelector(selectProductError);

  const creating = useSelector(selectCreatingProduct);
  const createError = useSelector(selectCreateProductError);
  const newProduct = useSelector(selectNewProduct);

  const updating = useSelector(selectUpdatingProduct);
  const updateError = useSelector(selectUpdateProductError);
  const updatedProduct = useSelector(selectUpdatedProduct);

  // Local UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Close form after create/update
  useEffect(() => {
    if (newProduct || updatedProduct) {
      setIsFormOpen(false);
      setEditingProduct(null);
      dispatch(clearAdminState());
    }
  }, [newProduct, updatedProduct, dispatch]);

  const openEditForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    dispatch(clearAdminState());
  };

  const handleSubmit = (productData) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('benefits', JSON.stringify(productData.benefits));
    formData.append('applications', JSON.stringify(productData.applications));
    if (productData.mainImage) formData.append('mainImage', productData.mainImage);
    if (productData.extraImages) {
      productData.extraImages.forEach((file) => formData.append('extraImages', file));
    }

    if (editingProduct && editingProduct._id) {
      dispatch(updateProduct({ productId: editingProduct._id, formData }));
    } else {
      dispatch(createProduct(formData));
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* Header */}
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

          {/* Loading & Errors */}
          {loadingProducts && <p>Loading products…</p>}
          {productError && <p className="text-red-500">{productError}</p>}

          {/* Product Form */}
          {isFormOpen && (
            <div className="mb-8 transform transition-all duration-300 ease-in-out">
              {(creating || updating) && <p>Submitting…</p>}
              {(createError || updateError) && (
                <p className="text-red-500">{createError || updateError}</p>
              )}
              <ProductForm
                onSubmit={handleSubmit}
                onCancel={closeForm}
                initialData={editingProduct}
                isEditing={!!editingProduct}
              />
            </div>
          )}

          {/* Product List */}
          <div className="transform transition-all duration-300">
            <ProductList
              products={products}
              onEdit={openEditForm}
              onDelete={(id) => {
                // Optionally dispatch a deleteProduct thunk here
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
