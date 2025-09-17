import React, { useState } from "react";
import PersonForm from "../Components/PersonForm";
import PersonList from "../Components/PersonList";
import Header from "../Components/Header";

function Persons() {
  const [persons, setPersons] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);

  // Add new person
  const handleAddPerson = (personData) => {
    const newPerson = {
      id: Date.now(),
      ...personData,
      createdAt: new Date().toLocaleDateString(),
    };
    setPersons([...persons, newPerson]);
    setIsFormOpen(false);
  };

  // Edit existing person
  const handleEditPerson = (personData) => {
    setPersons(
      persons.map((person) =>
        person.id === editingPerson.id
          ? {
              ...personData,
              id: editingPerson.id,
              createdAt: editingPerson.createdAt,
            }
          : person
      )
    );
    setEditingPerson(null);
    setIsFormOpen(false);
  };

  // Delete person
  const handleDeletePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const openEditForm = (person) => {
    setEditingPerson(person);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPerson(null);
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
                Persons
              </h1>
              <p className="text-gray-600">Manage your persons with ease</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg
                className="h-5 w-5"
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
              <span>Add New Person</span>
            </button>
          </div>

          {/* Person Form */}
          {isFormOpen && (
            <div className="mb-8 transform transition-all duration-300 ease-in-out">
              <PersonForm
                onSubmit={editingPerson ? handleEditPerson : handleAddPerson}
                onCancel={closeForm}
                initialData={editingPerson}
                isEditing={!!editingPerson}
              />
            </div>
          )}

          {/* Person List */}
          <div className="transform transition-all duration-300">
            <PersonList
              persons={persons}
              onEdit={openEditForm}
              onDelete={handleDeletePerson}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Persons;
