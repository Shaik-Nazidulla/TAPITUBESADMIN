// src/components/AboutPreview.jsx
import React from "react";

function AboutPreview({ data }) {
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No data available
      </div>
    );
  }

  const renderContent = (content) => {
    if (content.contentType === "text") {
      return <p className="text-gray-700 leading-relaxed">{content.textContent}</p>;
    } else if (content.contentType === "bulletList") {
      return (
        <ul className="list-disc list-inside space-y-2">
          {content.bulletPoints.map((bullet, index) => (
            <li key={index} className="text-gray-700">
              {bullet.text}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Our Mission */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        {renderContent(data.ourMission)}
      </div>

      {/* Our Vision */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        {renderContent(data.ourVision)}
      </div>

      {/* Our Values */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
        {renderContent(data.ourValues)}
      </div>

      {/* Dynamic Fields */}
      {data.dynamicFields && data.dynamicFields.length > 0 && (
        <>
          {data.dynamicFields.map((field, index) => (
            <div key={index} className="p-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {field.header}
              </h2>
              {renderContent(field.content)}
            </div>
          ))}
        </>
      )}

      {/* Metadata */}
      <div className="p-6 bg-gray-50 text-sm text-gray-600">
        <p>
          Created: {new Date(data.createdAt).toLocaleString()}
        </p>
        <p>
          Last Updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default AboutPreview;
