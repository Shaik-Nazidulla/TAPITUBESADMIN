// src/pages/AboutUs.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import AboutForm from "../components/AboutForm";
import AboutPreview from "../components/AboutPreview";
import {
  fetchAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
  clearError,
  clearSuccess,
} from "../redux/aboutSlice";

function AboutUs() {
  const dispatch = useDispatch();
  const aboutState = useSelector((state) => state.about) || {};
  const { 
    aboutData = null, 
    loading = false, 
    error = null, 
    success = false 
  } = aboutState;
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create"); // "create" or "edit"

  // Fetch about data on mount
  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  // Close form when operation succeeds
  useEffect(() => {
    if (success) {
      setIsFormOpen(false);
      dispatch(clearSuccess());
      dispatch(fetchAboutUs());
    }
  }, [success, dispatch]);

  const handleSubmit = (formData) => {
    if (formMode === "create") {
      dispatch(createAboutUs(formData));
    } else {
      dispatch(updateAboutUs(formData));
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete the About Us section? This action cannot be undone.")) {
      dispatch(deleteAboutUs());
    }
  };

  const openCreateForm = () => {
    setFormMode("create");
    setIsFormOpen(true);
  };

  const openEditForm = () => {
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    dispatch(clearError());
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">About Us</h1>
              <p className="text-gray-600">Manage your company's about section</p>
            </div>

            {/* Action Buttons - Top Right */}
            {aboutData && (
              <div className="flex gap-3">
                <button
                  onClick={openEditForm}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => dispatch(clearError())} className="text-red-800 hover:text-red-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Success State */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Operation completed successfully!
            </div>
          )}

          {/* About Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
                <AboutForm
                  onSubmit={handleSubmit}
                  onCancel={closeForm}
                  initialData={formMode === "edit" ? aboutData : null}
                  isEditing={formMode === "edit"}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          {!loading && !aboutData ? (
            /* Empty State - Show Create Button */
            <div className="bg-white rounded-lg shadow-md p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No About Section Yet
                </h3>
                <p className="text-gray-500 mb-8">
                  Get started by creating your company's About Us section. Add your mission, vision, values, and more.
                </p>
                <button
                  onClick={openCreateForm}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create About Section
                </button>
              </div>
            </div>
          ) : aboutData ? (
            /* Show About Content */
            <AboutPreview data={aboutData} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AboutUs;
