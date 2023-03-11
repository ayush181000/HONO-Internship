import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Button } from 'react-bootstrap';

const ViewDetailsModal = ({ book, authorName }) => {
  console.log(book.issue);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button className='w-100 btn btn-md btn-info' onClick={handleShow}>
        View Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{'Return Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* details and form */}
          <div className='container'>
            <div className='row'>
              <div className='col-4'>
                <img
                  className='img-fluid'
                  style={{
                    width: '160px',
                    height: '200px',
                    border: 'black 1px solid',
                  }}
                  src={book.cover}
                  alt='Not found'
                />
              </div>
              <div className='col-8 p-0'>
                <div>
                  Title: {book.title}
                  <br />
                  Author Name: {authorName}
                  <br />
                  Genre: {book.genre.toString().replaceAll(',', ' , ')}
                  <br />
                  Pages: {book.pages}
                  <br />
                  <br />
                  Return Details:
                  <br />
                  Issued Date:{' '}
                  {moment(book.issue.issueDate).format('DD-MM-YYYY')}
                  <br />
                  Expected Return Date:{' '}
                  {moment(book.issue.supposedReturnDate).format('DD-MM-YYYY')}
                  <br />
                  Return Date:{' '}
                  {moment(book.issue.returnDate).format('DD-MM-YYYY')}
                  <br />
                  Fine Paid: {`₹ ${book.issue.finePaid || 0}/-`}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewDetailsModal;
