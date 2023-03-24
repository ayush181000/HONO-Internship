import React from 'react';
import Nav from 'react-bootstrap/Nav';

const CustomNavbar = ({ currentState, setCurrentState }) => {
  return (
    <Nav
      variant='pills'
      className='justify-content-center'
      activeKey={currentState}
      onSelect={(selectedKey) => setCurrentState(selectedKey)}
    >
      <Nav.Item>
        <Nav.Link eventKey='issued'>Issued</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='returned'>Returned</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='all'>All</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default CustomNavbar;
