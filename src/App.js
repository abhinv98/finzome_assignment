import React, { useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';
import EditModal from './components/EditModal';

const App = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleFormSubmit = (formData) => {
    if (editIndex !== null) {
      // Edit mode
      const updatedFormDataList = [...formDataList];
      updatedFormDataList[editIndex] = formData;
      setFormDataList(updatedFormDataList);
      setEditIndex(null);
    } else {
      // Add mode
      setFormDataList((prevList) => [...prevList, formData]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedFormDataList = [...formDataList];
    updatedFormDataList.splice(index, 1);
    setFormDataList(updatedFormDataList);
  };

  const handleModalClose = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
      <Table data={formDataList} onEdit={handleEdit} onDelete={handleDelete} />
      {editIndex !== null && (
        <EditModal data={formDataList[editIndex]} onSave={handleFormSubmit} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default App;
