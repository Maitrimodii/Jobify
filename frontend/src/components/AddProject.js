import React, { useState } from 'react';
import Modal from 'react-modal';

const AddProject = ({ isOpen, onClose, handleAddProject }) => {
  // State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  // State Handling
  const handleInputChange = (field, value) => {
    setNewProject({ ...newProject, [field]: value });
  };

  const handleAddProjectClick = () => {
    handleAddProject(newProject);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewProject({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    });
  };

  // Render Method
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Project"
      className="modal-content bg-white p-8 rounded-md mx-auto my-12 max-w-md text-center relative"
      overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      ariaHideApp={false}
    >
      {/* Input fields */}
      <input
        type="text"
        placeholder="Project Title"
        value={newProject.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <textarea
        placeholder="Project Description"
        value={newProject.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Start Date"
        value={newProject.startDate}
        onChange={(e) => handleInputChange('startDate', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="End Date"
        value={newProject.endDate}
        onChange={(e) => handleInputChange('endDate', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Add Project Button */}
      <button
        type="button"
        onClick={handleAddProjectClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Project
      </button>
    </Modal>
  );
};

export default AddProject;
