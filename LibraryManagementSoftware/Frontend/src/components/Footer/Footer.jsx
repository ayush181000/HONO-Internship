import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-dark text-center text-white p-2 mt-auto'>
      {/* <div className='container p-4'>
        <section className='mb-4'>
          <p>A library management software made under HONO</p>
        </section>
      </div> */}

      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        Made By:{' '}
        <a
          className='text-white'
          href='https://github.com/ayush181000'
          target='_blank'
          rel='noreferrer'
        >
          Ayush Garg
        </a>
      </div>
    </footer>
  );
};

export default Footer;
