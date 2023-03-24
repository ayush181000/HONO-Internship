import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import BookTransactionsModal from './BookTransactionModal';
import UserTransactionsModal from './UserTransactionsModal';

const DataTable = ({ currentTab }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [showUserModal, setShowUserModal] = useState(false);
  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const [showBookModal, setShowBookModal] = useState(false);
  const handleShowBookModal = () => setShowBookModal(true);
  const handleCloseBookModal = () => setShowBookModal(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const getData = async () => {
    try {
      let requestString = 'book/transactions?';

      if (currentTab !== 'all') {
        requestString += `status=${currentTab}&`;
      }

      const response = await axios.get(requestString);

      setData(response.data.transactions);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}

      {
        <Table responsive>
          <thead>
            <tr>
              <th>Trans action ID</th>
              <th>Status</th>
              <th>Book</th>
              <th>User</th>
              <th>Issued Date</th>
              <th>Expected Return Date</th>
              <th>Returned Date</th>
              <th>Fine Paid</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const diff = moment(Date.now()).diff(
                moment(item.supposedReturnDate),
                'days'
              );

              const { status } = item;
              return (
                <tr
                  key={item._id.toString()}
                  style={
                    item.status !== 'returned' && diff > 0
                      ? { backgroundColor: '#FFEF5350' }
                      : {}
                  }
                >
                  {/* transaction id  */}
                  <td>{item._id.toString()}</td>

                  {/* transaction status */}
                  <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>

                  {/* book title */}
                  <td
                    style={{ cursor: 'default' }}
                    onClick={() => handleShowBookModal()}
                  >
                    {item.book.title}
                  </td>
                  <BookTransactionsModal
                    bookId={item.book._id.toString()}
                    showModal={showBookModal}
                    handleCloseModal={handleCloseBookModal}
                    handleShowsModal={handleShowBookModal}
                  />

                  {/* user email */}
                  <td
                    style={{ cursor: 'default' }}
                    // onClick={() => setUserSelected(item.user._id.toString())}
                    onClick={() => handleShowUserModal()}
                  >
                    {item.user.email}
                  </td>
                  <UserTransactionsModal
                    userId={item.user._id.toString()}
                    showUserModal={showUserModal}
                    handleCloseUserModal={handleCloseUserModal}
                    handleShowUserModal={handleShowUserModal}
                  />

                  <td>{moment(item.issueDate).format('DD-MM-YYYY')}</td>
                  <td>
                    {moment(item.supposedReturnDate).format('DD-MM-YYYY')}
                  </td>
                  <td>
                    {item.returnDate
                      ? moment(item.returnDate).format('DD-MM-YYYY')
                      : 'Not returned yet'}
                  </td>
                  <td>
                    {item.finePaid !== undefined
                      ? item.finePaid
                      : 'Not returned yet'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </>
  );
};

export default DataTable;
