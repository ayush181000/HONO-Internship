import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BookTransactionsModal = ({
  bookId,
  showModal,
  handleCloseModal,
  handleShowModal,
}) => {
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{bookId}</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookTransactionsModal;
