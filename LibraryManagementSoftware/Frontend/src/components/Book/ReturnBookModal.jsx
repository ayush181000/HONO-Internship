import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../shared/Loader/Loader';
import axios from 'axios';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

const ReturnBookModal = ({ book, authorName }) => {
  console.log(book.issue);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const {
    issueBook: { bookIssued, error, loading },
  } = useSelector((state) => state.books);

  const { token } = useSelector((state) => state.auth);

  const handleClose = () => {
    // dispatch({ type: UNSET_ISSUE_BOOK });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const calculateFine = () => {
    const endDate = moment(Date.now());
    const startDate = moment(book.issue.supposedReturnDate);

    const diff = endDate.diff(startDate, 'days');

    return diff > 0 ? diff * 5 : 0;
  };

  return (
    <>
      <Button className='w-100 btn btn-md btn-success' onClick={handleShow}>
        Return
      </Button>

      <Modal
        show={show}
        onHide={() => {
          if (!loading) handleClose();
        }}
      >
        <Modal.Header>
          <Modal.Title>{'Issue Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className='alert alert-danger'>{error}</div>}

          {loading && (
            <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
              <Loader />
            </div>
          )}

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
                  Issued Details
                  <br />
                  Issued Date:{' '}
                  {moment(book.issue.issueDate).format('DD-MM-YYYY')}
                  <br />
                  Return Date:{' '}
                  {moment(book.issue.supposedReturnDate).format('DD-MM-YYYY')}
                  <br />
                  Fine: {`₹ ${calculateFine()}/-`}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose} disabled={loading}>
            Close
          </Button>
          {!bookIssued && (
            <Button variant='success' onClick={() => {}} disabled={loading}>
              {calculateFine() === 0 ? 'Confirm Return' : 'Pay Fine'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReturnBookModal;
