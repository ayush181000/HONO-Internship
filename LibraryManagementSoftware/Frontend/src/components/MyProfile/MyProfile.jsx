import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  UPDATE_USER_FAIL,
  UPDATE_USER_INITIATED,
  UPDATE_USER_SUCCESS,
} from '../../redux/auth/reducer';
import Loader from '../shared/Loader/Loader';

const errorClass = {
  borderColor: 'red',
  boxShadow: ' 0 0 0 0.1px red',
};

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      confirmPassword: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data) => {
    dispatch({ type: UPDATE_USER_INITIATED });
    try {
      let response;

      const { firstName, lastName, password, newPassword, confirmNewPassword } =
        data;

      if (
        password.length > 0 &&
        newPassword.length > 0 &&
        confirmNewPassword.length > 0
      ) {
        response = await axios.patch(
          '/auth/me',
          { firstName, lastName, currentPassword: password, newPassword },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      } else {
        response = await axios.patch(
          '/auth/me',
          { firstName, lastName },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }

      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user: response.data.data, token: response.data.token },
      });
      reset({ password: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
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

      <form disabled={loading} onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading}>
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
              disabled
              {...register('email', { required: true })}
            />
          </div>

          <div className='form-group p-2'>
            <label>Old Password</label>
            <input
              style={errors.password ? errorClass : {}}
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='password'
              placeholder='Password'
              {...register('password', {
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
            <label>New Password</label>
            <input
              style={errors.newPassword ? errorClass : {}}
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='newPassword'
              placeholder='New Password'
              {...register('newPassword', {
                minLength: 6,
                maxLength: 20,
              })}
            />
            <small id='emailHelp' className='form-text text-muted'>
              {errors.newPassword?.type === 'minLength' &&
                'Password should be greater than 6 characters'}
              {errors.newPassword?.type === 'maxLength' &&
                'Password should be less than 20 characters'}
            </small>
          </div>

          <div className='form-group p-2'>
            <label>Confirm New Password</label>
            <input
              style={errors.confirmNewPassword ? errorClass : {}}
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='confirmNewPassword'
              placeholder='Password'
              {...register('confirmNewPassword', {
                minLength: 6,
                maxLength: 20,
                validate: (value) => value === getValues('newPassword'),
              })}
            />
            <small id='emailHelp' className='form-text text-muted'>
              {errors.confirmNewPassword?.type === 'minLength' &&
                'Password should be greater than 6 characters'}
              {errors.confirmNewPassword?.type === 'maxLength' &&
                'Password should be less than 20 characters'}
              {errors.confirmNewPassword?.type === 'validate' &&
                'Password does not match'}
            </small>
          </div>

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
            Update
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default MyProfile;
