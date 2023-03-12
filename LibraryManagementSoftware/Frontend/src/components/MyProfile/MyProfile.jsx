import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import Loader from '../shared/Loader/Loader';
import ChangePasswordModal from './ChangePasswordModal';

import {
  UPDATE_USER_FAIL,
  UPDATE_USER_INITIATED,
  UPDATE_USER_SUCCESS,
} from '../../redux/auth/reducer';

const errorClass = {
  borderColor: 'red',
  boxShadow: ' 0 0 0 0.1px red',
};

const MyProfile = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [image, setImage] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);

  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data) => {
    dispatch({ type: UPDATE_USER_INITIATED });
    try {
      const updatedFields = {
        firstName: data.firstName,
        lastName: data.lastName,
      };

      if (imgUrl) updatedFields.image = imgUrl;
      // console.log(updatedFields);
      const response = await axios.patch('/auth/me', updatedFields);

      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user: response.data.data, token: response.data.token },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  const sumitPhotoHandler = () => {
    const file = image;

    if (!file) return;

    const storageRef = ref(storage, `profile_image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}

      {loading && (
        <div style={{ left: '50%', top: '50%', position: 'absolute' }}>
          <Loader />
        </div>
      )}

      <form
        className='m-4'
        disabled={loading}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset disabled={loading}>
          {/* profile image */}
          <div className='text-center'>
            <img
              className='rounded-circle img-fluid m-5 '
              style={{ maxWidth: '250px', height: 'auto' }}
              src={user.image}
              alt='Not found'
            />
          </div>

          {/* profile image upload */}
          <div className='col form-group'>
            <input
              type='file'
              className='form-control '
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className='progress m-1'>
              <div
                className='progress-bar progress-bar-striped progress-bar-animated '
                role='progressbar'
                aria-valuemin='0'
                aria-valuemax='100'
                style={{ width: `${progresspercent}%` }}
              ></div>
            </div>

            <button
              className='btn btn-outline-primary'
              type='button'
              onClick={sumitPhotoHandler}
            >
              Upload
            </button>
          </div>

          {/* first name and last name */}
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

          {/* email address */}
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
          <button
            disabled={Object.keys(errors).length > 0 || loading}
            type='submit'
            className='btn btn-success p-2 m-2'
          >
            Update
          </button>
          <ChangePasswordModal />
        </fieldset>
      </form>
      <div className='m-4'></div>
    </>
  );
};

export default MyProfile;
