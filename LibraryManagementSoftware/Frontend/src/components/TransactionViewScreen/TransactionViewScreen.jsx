import React, { useState } from 'react';
import CustomNavbar from './CustomNavbar';
import DataTable from './DataTable';

const TransactionViewScreen = () => {
  const [currentTab, setCurrentTab] = useState('issued');

  return (
    <>
      <CustomNavbar currentState={currentTab} setCurrentState={setCurrentTab} />
      <DataTable currentTab={currentTab} />
    </>
  );
};

export default TransactionViewScreen;
