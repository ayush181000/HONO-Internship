import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Loader from '../shared/Loader/Loader';

import './index.css';

import {
  AUTH_INITIATED,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
} from '../../redux/auth/reducer';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    getValues,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    reset,
    formState: { errors },
  } = useForm();

  const [loginMode, setLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const switchToSignup = () => {
    setLoginMode(!loginMode);
  };

  const onSubmit = async (data) => {
    // console.log(data);
    dispatch({ type: AUTH_INITIATED });

    if (loginMode) {
      // login function
      try {
        const response = await axios.post('auth/login', {
          email: data.email,
          password: data.password,
        });

        localStorage.setItem('token', response.data.data.token);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.data });
        reset();
      } catch (error) {
        dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
    } else {
      // singup function
      try {
        const response = await axios.post('auth/signup', {
          firstName: data.firstName,
          lastName: data.lastName || '',
          email: data.email,
          password: data.password,
        });

        // console.log(response);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data.data });
        reset();
      } catch (error) {
        console.log(error);
        dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  };

  const errorClass = {
    borderColor: 'red',
    boxShadow: ' 0 0 0 0.1px red',
  };

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}
      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}
      <form disabled={loading} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading}>
          {loginMode && (
            <div>
              <div className='form-group p-2'>
                <label>Email address</label>
                <input
                  style={errors.email ? errorClass : {}}
                  type='text'
                  className='form-control'
                  id='email'
                  placeholder='Enter email'
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  {errors.email?.type === 'pattern' &&
                    'Please input a valid email address'}
                  {errors.email?.type === 'required' && 'Email is required'}
                </small>
              </div>

              <div className='form-group p-2'>
                <label>Password</label>
                <input
                  style={errors.password ? errorClass : {}}
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  id='password'
                  placeholder='Password'
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  {errors.password?.type === 'minLength' &&
                    'Password should be greater than 6 characters'}
                  {errors.password?.type === 'maxLength' &&
                    'Password should be less than 20 characters'}
                </small>
              </div>
            </div>
          )}

          {!loginMode && (
            <div>
              <div className='row'>
                <div className='col'>
                  <div className='form-group p-2'>
                    <label>First Name</label>
                    <input
                      style={errors.firstName ? errorClass : {}}
                      type='text'
                      className='form-control'
                      id='firstName'
                      placeholder='Enter first name'
                      {...register('firstName', { required: true })}
                    />
                    <small id='emailHelp' className='form-text text-muted'>
                      {errors.firstName?.type === 'required' &&
                        'First name is required'}
                    </small>
                  </div>
                </div>

                <div className='col'>
                  <div className='form-group p-2'>
                    <label>Last Name</label>
                    <input
                      style={errors.lastName ? errorClass : {}}
                      type='text'
                      className='form-control'
                      id='lastName'
                      placeholder='Enter last name'
                      {...register('lastName')}
                    />
                    <small id='emailHelp' className='form-text text-muted'>
                      {errors.lastName?.type === 'required' &&
                        'Last name is required'}
                    </small>
                  </div>
                </div>
              </div>

              <div className='form-group p-2'>
                <label>Email address</label>
                <input
                  style={errors.email ? errorClass : {}}
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter email'
                  {...register('email', { required: true })}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  {errors.email?.type === 'pattern' &&
                    'Please input a valid email address'}
                  {errors.email?.type === 'required' && 'Email is required'}
                </small>
              </div>

              <div className='form-group p-2'>
                <label>Password</label>
                <input
                  style={errors.password ? errorClass : {}}
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  id='password'
                  placeholder='Password'
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  {errors.password?.type === 'minLength' &&
                    'Password should be greater than 6 characters'}
                  {errors.password?.type === 'maxLength' &&
                    'Password should be less than 20 characters'}
                </small>
              </div>

              <div className='form-group p-2'>
                <label>Confirm Password</label>
                <input
                  style={errors.confirmPassword ? errorClass : {}}
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  id='passwordConfirm'
                  placeholder='Password'
                  {...register('confirmPassword', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    validate: (value) => value === getValues('password'),
                  })}
                />
                <small id='emailHelp' className='form-text text-muted'>
                  {errors.confirmPassword?.type === 'minLength' &&
                    'Password should be greater than 6 characters'}
                  {errors.confirmPassword?.type === 'maxLength' &&
                    'Password should be less than 20 characters'}
                  {errors.confirmPassword?.type === 'validate' &&
                    'Password does not match'}
                </small>
              </div>
            </div>
          )}

          <div className='form-check'>
            <input
              type='checkbox'
              id='showPassword'
              className='form-check-input'
              placeholder='Show Password'
              onClick={() => setShowPassword(!showPassword)}
            />
            <label className='form-check-label' htmlFor='showPassword'>
              Show password
            </label>
          </div>

          <button
            disabled={Object.keys(errors).length > 0 || loading}
            type='submit'
            className='btn btn-success p-2 m-2'
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
        </fieldset>
      </form>
    </>
  );
};

export default Login;
