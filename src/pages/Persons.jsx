// src/pages/Persons.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import PersonForm from "../Components/PersonForm";
import PersonList from "../Components/PersonList";
import {
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  clearPersonAdminState,
  selectTeamMembers,
  selectLoadingTeam,
  selectTeamError,
  selectCreating,
  selectCreateError,
  selectUpdating,
  selectUpdateError,
  selectNewMember,
  selectUpdatedMember,
} from "../redux/personAdminSlice";

function Persons() {
  const dispatch = useDispatch();
  const persons = useSelector(selectTeamMembers);
  const loadingTeam = useSelector(selectLoadingTeam);
  const teamError = useSelector(selectTeamError);

  const creating = useSelector(selectCreating);
  const createError = useSelector(selectCreateError);
  const newMember = useSelector(selectNewMember);

  const updating = useSelector(selectUpdating);
  const updateError = useSelector(selectUpdateError);
  const updatedMember = useSelector(selectUpdatedMember);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);

  // Fetch list on mount
  useEffect(() => {
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  // Close form and clear slice state when a create/update completes
  useEffect(() => {
    if (newMember || updatedMember) {
      setIsFormOpen(false);
      setEditingPerson(null);
      dispatch(clearPersonAdminState());
    }
  }, [newMember, updatedMember, dispatch]);

  const handleAddPerson = (personData) => {
    const formData = new FormData();
    formData.append("name", personData.name);
    formData.append("designation", personData.designation);
    formData.append("description", personData.description);
    if (personData.image) formData.append("image", personData.image);
    dispatch(createTeamMember(formData));
  };

  const handleEditPerson = (personData) => {
    const formData = new FormData();
    formData.append("name", personData.name);
    formData.append("designation", personData.designation);
    formData.append("description", personData.description);
    if (personData.image) formData.append("image", personData.image);
    dispatch(updateTeamMember({ personId: editingPerson._id, formData }));
  };

  const openEditForm = (person) => {
    setEditingPerson(person);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPerson(null);
    dispatch(clearPersonAdminState());
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

          {/* Team Loading/Error */}
          {loadingTeam && <p>Loading team members…</p>}
          {teamError && <p className="text-red-500">{teamError}</p>}

          {/* Person Form */}
          {isFormOpen && (
            <div className="mb-8 transform transition-all duration-300 ease-in-out">
              {(creating || updating) && <p>Submitting…</p>}
              {(createError || updateError) && (
                <p className="text-red-500">{createError || updateError}</p>
              )}
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
              onDelete={(id) => {
                // Optionally implement deleteTeamMember thunk
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Persons;
