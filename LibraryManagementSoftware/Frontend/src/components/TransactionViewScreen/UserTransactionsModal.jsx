import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserTransactionsModal = ({
  userId,
  showUserModal,
  handleCloseUserModal,
  handleShowUserModal,
}) => {
  return (
    <>
      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>{userId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseUserModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleCloseUserModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTransactionsModal;
