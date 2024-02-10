import React, { useState } from 'react';
import Modal from 'react-modal';

const AddSkill = ({ isOpen, onRequestClose, onAddSkill }) => {
  // State
  const [newSkill, setNewSkill] = useState('');

  // State Handling
  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkillClick = () => {
    onAddSkill(newSkill);
    resetForm();
    onRequestClose();
  };

  const resetForm = () => {
    setNewSkill('');
  };

  // Render Method
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Skill"
      className="modal-content bg-white p-8 rounded-md mx-auto my-12 max-w-md text-center relative"
      overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      ariaHideApp={false}
    >
      {/* Input field */}
      <input
        type="text"
        placeholder="Add new skill"
        value={newSkill}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Add Skill Button */}
      <button
        type="button"
        onClick={handleAddSkillClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Add
      </button>
    </Modal>
  );
};

export default AddSkill;
