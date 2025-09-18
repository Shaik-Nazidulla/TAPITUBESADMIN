import React, { useState, useEffect } from "react";

function ProductForm({ onSubmit, onCancel, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefits: [{ point: "", description: "" }],
    applications: [{ point: "", description: "" }],
    mainImage: null,
    extraImages: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        benefits: initialData.benefits?.length
          ? initialData.benefits
          : [{ point: "", description: "" }],
        applications: initialData.applications?.length
          ? initialData.applications
          : [{ point: "", description: "" }],
        mainImage: initialData.mainImage || null,
        extraImages: initialData.extraImages || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "mainImage") {
        setFormData({ ...formData, mainImage: files[0] });
      } else if (name === "extraImages") {
        setFormData({
          ...formData,
          extraImages: [...formData.extraImages, ...Array.from(files)],
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDynamicChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { point: "", description: "" }],
    });
  };

  const removeField = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const removeExtraImage = (index) => {
    const updated = [...formData.extraImages];
    updated.splice(index, 1);
    setFormData({ ...formData, extraImages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Benefits
          </label>
          {formData.benefits.map((b, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Benefit point"
                value={b.point}
                onChange={(e) =>
                  handleDynamicChange("benefits", index, "point", e.target.value)
                }
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Benefit description"
                value={b.description}
                onChange={(e) =>
                  handleDynamicChange(
                    "benefits",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => removeField("benefits", index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("benefits")}
            className="mt-2 text-sm text-blue-600"
          >
            + Add Benefit
          </button>
        </div>

        {/* Applications */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Applications
          </label>
          {formData.applications.map((a, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Application point"
                value={a.point}
                onChange={(e) =>
                  handleDynamicChange(
                    "applications",
                    index,
                    "point",
                    e.target.value
                  )
                }
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Application description"
                value={a.description}
                onChange={(e) =>
                  handleDynamicChange(
                    "applications",
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => removeField("applications", index)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("applications")}
            className="mt-2 text-sm text-blue-600"
          >
            + Add Application
          </button>
        </div>

        {/* Main Image */}
        <div>
          <label
            htmlFor="mainImage"
            className="block text-sm font-medium text-gray-700"
          >
            Main Image
          </label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {formData.mainImage && (
            <p className="text-xs text-gray-500 mt-1">
              {formData.mainImage.name}
            </p>
          )}
        </div>

        {/* Extra Images */}
        <div>
          <label
            htmlFor="extraImages"
            className="block text-sm font-medium text-gray-700"
          >
            Extra Images
          </label>
          <input
            type="file"
            id="extraImages"
            name="extraImages"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {formData.extraImages.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {formData.extraImages.map((img, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  {img.name}
                  <button
                    type="button"
                    onClick={() => removeExtraImage(idx)}
                    className="text-red-500 text-xs"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
