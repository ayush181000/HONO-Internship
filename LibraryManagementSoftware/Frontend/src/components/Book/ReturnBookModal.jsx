import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import moment from 'moment';
import Loader from '../shared/Loader/Loader';

const ReturnBookModal = ({ book, authorName }) => {
  // console.log(book.issue);
  const [show, setShow] = useState(false);
  const [fine, setFine] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    calculateFine();
    setShow(true);
  };

  const returnHandler = async () => {
    setLoading(true);
    try {
      if (fine !== 0) {
        await axios.post('/book/payFine', {
          transactionId: book.issue._id,
          finePaid: fine,
          fineTransactionId: 'randomString',
        });
      }
      const returnBookResponse = await axios.post('/book/return', {
        bookId: book._id,
      });
      if (returnBookResponse.status === 200) {
        setSuccess('Returned Book Successfully');
      }
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const calculateFine = () => {
    const endDate = moment(Date.now());
    const startDate = moment(book.issue.supposedReturnDate);
    const diff = endDate.diff(startDate, 'days');
    if (diff > 0) setFine(diff * 5);
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
          {success && <div className='alert alert-success'>{success}</div>}

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
                  Fine: {`₹ ${fine}/-`}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose} disabled={loading}>
            Close
          </Button>

          <Button
            variant='success'
            onClick={() => {
              returnHandler();
            }}
            disabled={loading}
          >
            {fine === 0 ? 'Confirm Return' : 'Pay Fine And Return Book'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReturnBookModal;
