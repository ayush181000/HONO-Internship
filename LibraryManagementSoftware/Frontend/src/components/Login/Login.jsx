import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loader from '../shared/Loader/Loader';

import {
  AUTH_INITIATED,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
} from '../../redux/auth/reducer';

const errorClass = {
  borderColor: 'red',
  boxShadow: ' 0 0 0 0.1px red',
};

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { user, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    reset({ email: 'ayush@gmail.com', password: '123456' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        axios.defaults.headers['Authorization'] =
          'Bearer ' + response.data.token;

        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: {
            user: response.data.data,
            token: response.data.token,
          },
        });
        reset();
        navigate('/');
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

        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: {
            user: response.data.data,
            token: response.data.token,
          },
        });
        reset();
        navigate('/');
      } catch (error) {
        console.log(error);
        dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  };

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}

      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      <div className='container p-5 m-4'>
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

            <div className='form-check m-2'>
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
      </div>
    </>
  );
};

export default Login;
