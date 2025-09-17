import React, { useState, useEffect } from "react";

function PersonForm({ onSubmit, onCancel, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        image: null, // reset file input (can't set file directly)
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const personData = {
      ...formData,
      id: initialData?.id || Date.now(),
      createdAt: initialData?.createdAt || new Date().toLocaleDateString(),
      imageUrl: formData.image
        ? URL.createObjectURL(formData.image)
        : initialData?.imageUrl || null,
    };

    onSubmit(personData);

    setFormData({
      name: "",
      designation: "",
      description: "",
      image: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-200"
    >
      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Designation */}
      <input
        type="text"
        name="designation"
        placeholder="Designation (e.g., Manager)"
        value={formData.designation}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Short Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        rows={3}
        required
      />

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          {isEditing ? "Update Person" : "Add Person"}
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
