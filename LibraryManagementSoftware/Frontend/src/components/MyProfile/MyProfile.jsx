import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Loader from '../shared/Loader/Loader';

const errorClass = {
  borderColor: 'red',
  boxShadow: ' 0 0 0 0.1px red',
};

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}

      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      <form disabled={loading}>
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
            <small id='emailHelp' className='form-text text-muted'>
              {errors.email?.type === 'pattern' &&
                'Please input a valid email address'}
              {errors.email?.type === 'required' && 'Email is required'}
            </small>
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
            <label>New Password</label>
            <input
              style={errors.newPassword ? errorClass : {}}
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='password'
              placeholder='New Password'
              {...register('newPassword', {
                required: true,
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
              id='passwordConfirm'
              placeholder='Password'
              {...register('confirmNewPassword', {
                required: true,
                minLength: 6,
                maxLength: 20,
                validate: (value) => value === getValues('password'),
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
        </fieldset>
      </form>
    </>
  );
};

export default MyProfile;
