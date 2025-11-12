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
  deleteProduct,
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

    // Add size charts to FormData
    if (productData.sizeCharts) {
      productData.sizeCharts.forEach((file) => formData.append('sizeCharts', file));
    }

    if (editingProduct && editingProduct._id) {
      dispatch(updateProduct({ productId: editingProduct._id, formData }));
      dispatch(fetchProducts());
    } else {
      dispatch(createProduct(formData));
      dispatch(fetchProducts());
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
      dispatch(fetchProducts());
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Manage your product catalog with ease</p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add New Product
          </button>
        </div>

        {loadingProducts && <p className="text-center">Loading products…</p>}
        {productError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {productError}
          </div>
        )}

        {/* Product Form - FIXED: Added isEditing prop */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full m-4 max-h-[90vh] overflow-y-auto">
              <ProductForm
                initialData={editingProduct}
                isEditing={!!editingProduct}
                onSubmit={handleSubmit}
                onCancel={closeForm}
              />
              {(creating || updating) && <p className="mt-4 text-center">Submitting…</p>}
              {(createError || updateError) && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {createError || updateError}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product List */}
        <ProductList
          products={products}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default Products;
