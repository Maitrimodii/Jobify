import React, { useState } from 'react';
import Modal from 'react-modal';

const AddCertification = ({ isOpen, onClose, onAddCertification }) => {
  // State
  const [newCertification, setNewCertification] = useState({
    title: '',
    issuer: '',
    issueDate: '' ,
  });

  // State Handling
  const handleInputChange = (field, value) => {
    setNewCertification({ ...newCertification, [field]: value });
  };

  const handleAddCertification = () => {
    onAddCertification(newCertification);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setNewCertification({
      title: '',
      issuer: '',
      issueDate: '',
    });
  };

  // Render Method
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Certificate"
      className="modal-content bg-white p-8 rounded-md mx-auto my-12 max-w-md text-center relative"
      overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      ariaHideApp={false}
    >
      {/* Input fields */}
      <input
        type="text"
        placeholder="Certification Title"
        value={newCertification.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Issuer"
        value={newCertification.issuer}
        onChange={(e) => handleInputChange('issuer', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Issue Date"
        value={newCertification.issueDate}
        onChange={(e) => handleInputChange('issueDate', e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Add Certification Button */}
      <button
        type="button"
        onClick={handleAddCertification}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Certification
      </button>
    </Modal>
  );
};

export default AddCertification;
