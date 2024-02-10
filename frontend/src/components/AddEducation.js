import React, { useState } from 'react';
import Modal from 'react-modal';

const AddEducation = ({ isOpen, onClose, onAddEducation }) => {
  // State
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    graduationYear: '',
  });

  // State Handling
  const handleInputChange = (field, value) => {
    setNewEducation({ ...newEducation, [field]: value });
  };

  const handleAddEducation = () => {
    onAddEducation(newEducation);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewEducation({
      degree: '',
      institution: '',
      graduationYear: '',
    });
  };

  // Render Method
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      contentLabel="Add Education" 
      className="modal-content bg-white p-8 rounded-md mx-auto my-12 max-w-md text-center relative"
      overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      ariaHideApp={false}
    >
      {/* Input fields */}
      <input
        type="text"
        placeholder="Degree"
        value={newEducation.degree}
        onChange={(e) => handleInputChange('degree', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Institution"
        value={newEducation.institution}
        onChange={(e) => handleInputChange('institution', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="number"
        placeholder="Graduation Year"
        value={newEducation.graduationYear}
        onChange={(e) => handleInputChange('graduationYear', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Add Education Button */}
      <button
        type="button"
        onClick={handleAddEducation}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Education
      </button>
    </Modal>
  );
};

export default AddEducation;
