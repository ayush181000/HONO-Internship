import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllIssuedBooks = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('/book/transactions');

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
                  style={diff > 0 ? { backgroundColor: 'red' } : {}}
                >
                  <td>{item._id.toString()}</td>
                  <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
                  <Link
                    to={`/book/${item.book._id}`}
                    style={{ all: 'unset', cursor: 'default' }}
                  >
                    <td>{item.book.title}</td>
                  </Link>
                  <td>{item.user.email}</td>
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

export default AllIssuedBooks;
