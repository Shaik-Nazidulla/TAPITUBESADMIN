// src/components/AboutForm.jsx
import React, { useState, useEffect } from "react";

function AboutForm({ onSubmit, onCancel, initialData, isEditing }) {
  const [formData, setFormData] = useState({
    ourMission: {
      contentType: "text",
      textContent: "",
      bulletPoints: [],
    },
    ourVision: {
      contentType: "text",
      textContent: "",
      bulletPoints: [],
    },
    ourValues: {
      contentType: "bulletList",
      bulletPoints: [],
    },
    dynamicFields: [],
  });

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ourMission: initialData.ourMission || {
          contentType: "text",
          textContent: "",
          bulletPoints: [],
        },
        ourVision: initialData.ourVision || {
          contentType: "text",
          textContent: "",
          bulletPoints: [],
        },
        ourValues: initialData.ourValues || {
          contentType: "bulletList",
          bulletPoints: [],
        },
        dynamicFields: initialData.dynamicFields || [],
      });
    }
  }, [initialData]);

  const handleTextChange = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        textContent: value,
      },
    }));
  };

  const handleBulletPointChange = (section, index, value) => {
    setFormData((prev) => {
      const updatedBulletPoints = [...prev[section].bulletPoints];
      updatedBulletPoints[index] = { text: value };
      return {
        ...prev,
        [section]: {
          ...prev[section],
          bulletPoints: updatedBulletPoints,
        },
      };
    });
  };

  const addBulletPoint = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        bulletPoints: [...prev[section].bulletPoints, { text: "" }],
      },
    }));
  };

  const removeBulletPoint = (section, index) => {
    setFormData((prev) => {
      const updatedBulletPoints = prev[section].bulletPoints.filter(
        (_, i) => i !== index
      );
      return {
        ...prev,
        [section]: {
          ...prev[section],
          bulletPoints: updatedBulletPoints,
        },
      };
    });
  };

  const addDynamicField = () => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: [
        ...prev.dynamicFields,
        {
          header: "",
          content: {
            contentType: "text",
            textContent: "",
            bulletPoints: [],
          },
        },
      ],
    }));
  };

  const removeDynamicField = (index) => {
    setFormData((prev) => ({
      ...prev,
      dynamicFields: prev.dynamicFields.filter((_, i) => i !== index),
    }));
  };

  const handleDynamicFieldChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFields = [...prev.dynamicFields];
      if (field === "header") {
        updatedFields[index].header = value;
      } else if (field === "contentType") {
        updatedFields[index].content.contentType = value;
        if (value === "text") {
          updatedFields[index].content.bulletPoints = [];
        } else {
          updatedFields[index].content.textContent = "";
        }
      } else if (field === "textContent") {
        updatedFields[index].content.textContent = value;
      }
      return {
        ...prev,
        dynamicFields: updatedFields,
      };
    });
  };

  const handleDynamicBulletChange = (fieldIndex, bulletIndex, value) => {
    setFormData((prev) => {
      const updatedFields = [...prev.dynamicFields];
      const updatedBullets = [...updatedFields[fieldIndex].content.bulletPoints];
      updatedBullets[bulletIndex] = { text: value };
      updatedFields[fieldIndex].content.bulletPoints = updatedBullets;
      return {
        ...prev,
        dynamicFields: updatedFields,
      };
    });
  };

  const addDynamicBullet = (fieldIndex) => {
    setFormData((prev) => {
      const updatedFields = [...prev.dynamicFields];
      updatedFields[fieldIndex].content.bulletPoints.push({ text: "" });
      return {
        ...prev,
        dynamicFields: updatedFields,
      };
    });
  };

  const removeDynamicBullet = (fieldIndex, bulletIndex) => {
    setFormData((prev) => {
      const updatedFields = [...prev.dynamicFields];
      updatedFields[fieldIndex].content.bulletPoints = updatedFields[
        fieldIndex
      ].content.bulletPoints.filter((_, i) => i !== bulletIndex);
      return {
        ...prev,
        dynamicFields: updatedFields,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit About Section" : "Create About Section"}
        </h2>
      </div>

      {/* Our Mission */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Our Mission
        </label>
        <textarea
          value={formData.ourMission.textContent}
          onChange={(e) => handleTextChange("ourMission", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Enter your mission statement"
          required
        />
      </div>

      {/* Our Vision */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Our Vision
        </label>
        <textarea
          value={formData.ourVision.textContent}
          onChange={(e) => handleTextChange("ourVision", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Enter your vision statement"
          required
        />
      </div>

      {/* Our Values */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Our Values
        </label>
        {formData.ourValues.bulletPoints.map((bullet, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={bullet.text}
              onChange={(e) =>
                handleBulletPointChange("ourValues", index, e.target.value)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter value"
              required
            />
            <button
              type="button"
              onClick={() => removeBulletPoint("ourValues", index)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addBulletPoint("ourValues")}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Value
        </button>
      </div>

      {/* Dynamic Fields */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Additional Sections
          </label>
          <button
            type="button"
            onClick={addDynamicField}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Section
          </button>
        </div>

        {formData.dynamicFields.map((field, fieldIndex) => (
          <div key={fieldIndex} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Section {fieldIndex + 1}</h3>
              <button
                type="button"
                onClick={() => removeDynamicField(fieldIndex)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Remove Section
              </button>
            </div>

            <input
              type="text"
              value={field.header}
              onChange={(e) =>
                handleDynamicFieldChange(fieldIndex, "header", e.target.value)
              }
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Section Header (e.g., Why Choose Us)"
              required
            />

            <select
              value={field.content.contentType}
              onChange={(e) =>
                handleDynamicFieldChange(fieldIndex, "contentType", e.target.value)
              }
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="text">Text Content</option>
              <option value="bulletList">Bullet List</option>
            </select>

            {field.content.contentType === "text" ? (
              <textarea
                value={field.content.textContent}
                onChange={(e) =>
                  handleDynamicFieldChange(fieldIndex, "textContent", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Enter text content"
                required
              />
            ) : (
              <div>
                {field.content.bulletPoints.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={bullet.text}
                      onChange={(e) =>
                        handleDynamicBulletChange(
                          fieldIndex,
                          bulletIndex,
                          e.target.value
                        )
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bullet point"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeDynamicBullet(fieldIndex, bulletIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addDynamicBullet(fieldIndex)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                >
                  Add Bullet Point
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {isEditing ? "Update About Section" : "Create About Section"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AboutForm;
