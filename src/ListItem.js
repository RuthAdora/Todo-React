
import React, { useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';

const ListItem = ({
  item,
  index,
  deleteItem,
  editItem,
  showEditModal,
  setShowEditModal,
  editedItemValue,
  setEditedItemValue,
  handleSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localEditedValue, setLocalEditedValue] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setLocalEditedValue(item.value);
  };

  /*const handleSave = () => {
    // Update the parent component's state with the edited value
    handleSave(editedItemValue);
    setIsEditing(false);
    setShowEditModal(false);
  };*/

  return (
    <div>
      {/* ... rest of your JSX code */}
    </div>
  );
};

export default ListItem;
