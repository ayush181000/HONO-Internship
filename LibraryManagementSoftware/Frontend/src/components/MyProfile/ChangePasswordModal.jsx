import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../shared/Loader/Loader';
import axios from 'axios';
import {
  UPDATE_USER_FAIL,
  UPDATE_USER_INITIATED,
  UPDATE_USER_SUCCESS,
} from '../../redux/auth/reducer';

const errorClass = {
  borderColor: 'red',
  boxShadow: ' 0 0 0 0.1px red',
};

const ChangePasswordModal = () => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.auth);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const onSubmit = async () => {
    dispatch({ type: UPDATE_USER_INITIATED });

    const password = getValues('password');
    const newPassword = getValues('newPassword');
    const confirmNewPassword = getValues('confirmNewPassword');

    if (
      password.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0
    ) {
      try {
        let response = await axios.patch('/auth/me', {
          currentPassword: password,
          newPassword,
        });

        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { user: response.data.data, token: response.data.token },
        });

        localStorage.setItem('user', JSON.stringify(response.data.data));
        localStorage.setItem('token', response.data.token);

        axios.defaults.headers['Authorization'] =
          'Bearer ' + response.data.token;

        reset({ password: '', newPassword: '', confirmNewPassword: '' });

        setTimeout(() => handleClose(), 2000);
      } catch (error) {
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: error.response.data.message,
        });
      }
    } else return;
  };

  return (
    <>
      <Button className='btn btn-md btn-info' onClick={handleShow}>
        Change Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form
          className='m-4'
          disabled={loading}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Modal.Header>
            <Modal.Title>{'Change Password'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <div className='alert alert-danger'>{error}</div>}

            {loading && (
              <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
                <Loader />
              </div>
            )}

            <fieldset disabled={loading}>
              <div className='container'>
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
              </div>
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleClose}>
              Close
            </Button>

            <Button variant='success' onClick={onSubmit}>
              Change
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
