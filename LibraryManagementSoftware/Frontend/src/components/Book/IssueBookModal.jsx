import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from '../shared/Loader/Loader';
import axios from 'axios';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import {
  ISSUE_BOOK_ERROR,
  ISSUE_BOOK_INITIATED,
  ISSUE_BOOK_SUCCESS,
  UNSET_ISSUE_BOOK,
} from '../../redux/books/reducer';

const IssueBookModal = ({ book, authorName }) => {
  const [show, setShow] = useState(false);
  const [duration, setDuration] = useState('1');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: UNSET_ISSUE_BOOK });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const issueBookHandler = async () => {
    dispatch({ type: ISSUE_BOOK_INITIATED });
    try {
      const response = await axios.post(
        '/book/issue',
        {
          bookId: book._id.toString(),
          numberOfWeeks: +duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data.transaction);

      dispatch({
        type: ISSUE_BOOK_SUCCESS,
        payload: response.data.transaction,
      });
    } catch (error) {
      dispatch({
        type: ISSUE_BOOK_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const {
    issueBook: { bookIssued, error, loading },
  } = useSelector((state) => state.books);

  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Button className='w-100 btn btn-md btn-primary' onClick={handleShow}>
        Issue
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
                </div>

                {!bookIssued && (
                  <div>
                    <label className='mt-4'>
                      Choose the duration (in weeks)
                    </label>
                    <select
                      type='select'
                      className='form-select'
                      aria-required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option defaultValue value='1'>
                        1
                      </option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                    </select>
                  </div>
                )}

                {bookIssued && (
                  <div>
                    <br />
                    Status:{' '}
                    <p className='m-0 p-0 d-inline text-success'>Book Issued</p>
                    <br />
                    Issue Date:{' '}
                    {moment(bookIssued.issueDate).format('DD-MM-YYYY')}
                    <br />
                    Expected Return Date:{' '}
                    {moment(bookIssued.supposedReturnDate).format('DD-MM-YYYY')}
                    <br />
                    <p className='m-0 p-0 d-inline text-danger'>
                      Note: Delay in returning will occur a penalty of ₹ 5/- per
                      day
                    </p>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleClose} disabled={loading}>
            Close
          </Button>
          {!bookIssued && (
            <Button
              variant='success'
              onClick={issueBookHandler}
              disabled={loading}
            >
              Confirm
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IssueBookModal;
