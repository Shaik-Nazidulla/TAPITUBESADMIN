import React from "react";

function PersonList({ persons, onEdit, onDelete }) {
  if (persons.length === 0) {
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
              d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H6a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2zm6-6V6a2 2 0 00-2-2h-2"
            />
          </svg>
        </div>
        <div className="text-gray-500 text-xl font-semibold mb-2">
          No persons added yet
        </div>
        <p className="text-gray-400">
          Click "Add New Person" to showcase your team or members
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
      {persons.map((person) => (
        <div
          key={person.id}
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* Person Image */}
          <div className="flex justify-center mt-6">
            {person.image ? (
              <img
                src={person.image}
                alt={person.name}
                className="h-24 w-24 rounded-full object-cover shadow-md border border-gray-200"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center text-gray-600 font-bold text-xl shadow-md">
                {person.name?.charAt(0) || "?"}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900">{person.name}</h3>
            <p className="text-sm text-indigo-600 font-medium mb-2">
              {person.designation}
            </p>
            <p className="text-gray-500 text-sm line-clamp-3 mb-4">
              {person.description}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Created: {person.createdAt}
            </p>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onEdit(person)}
                className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(person.id, person.name)}
                className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-900 transition-colors duration-200"
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

export default PersonList;
