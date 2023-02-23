import React, { useState } from 'react';

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);

  const switchToSignup = () => {
    // console.log(loginMode);
    setLoginMode(!loginMode);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form>
        {loginMode && (
          <div>
            <div className='form-group p-2'>
              <label>Email address</label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Enter email'
              />
            </div>

            <div className='form-group p-2'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
              />
            </div>
          </div>
        )}

        {!loginMode && (
          <div>
            <div className='form-group p-2'>
              <label>First Name</label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                placeholder='Enter first name'
              />
            </div>

            <div className='form-group p-2'>
              <label>Last Name</label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                placeholder='Enter last name'
              />
            </div>

            <div className='form-group p-2'>
              <label>Email address</label>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Enter email'
              />
            </div>

            <div className='form-group p-2'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Password'
              />
            </div>

            <div className='form-group p-2'>
              <label>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                id='passwordConfirm'
                placeholder='Password'
              />
            </div>
          </div>
        )}

        {/* <div className="form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" for="exampleCheck1">Show password</label>
      </div> */}

        <button
          type='button'
          className='btn btn-success p-2 m-2'
          onClick={onSubmit}
        >
          {loginMode ? 'Login' : 'Sign Up'}
        </button>

        <button
          type='button'
          className='btn btn-primary p-2 m-2'
          onClick={switchToSignup}
        >
          Switch to {loginMode ? 'Sign Up' : 'Login'} mode
        </button>
      </form>
    </>
  );
};

export default Login;
