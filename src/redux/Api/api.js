import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

export const instanceWater = axios.create({
  withCredentials: true,
  baseURL: 'https://watertrackerbackend-5ymk.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = token => {
  instanceWater.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const unsetToken = () => {
  instanceWater.defaults.headers.common.Authorization = '';
};

// Auth

export const signup = async body => {
  const { data } = await instanceWater.post('/auth/signup', body);
  setToken(data.accessToken);
  return data;
};

export const signin = async body => {
  const { data: wrap } = await instanceWater.post('/auth/signin', body);
  setToken(wrap.data.accessToken);
  return wrap.data;
};

export const logout = async () => {
  await instanceWater.post('/auth/logout');
  unsetToken();
};

export const requestPassword = async body => {
  const { data } = await instanceWater.post('/auth/request-pass', body);
  return data;
};

export const resetPassword = async body => {
  const { data } = await instanceWater().post('/auth/reset-pass', body);
  return data;
};

export const refresh = async () => {
  const { data: wrap } = await instanceWater.post('/auth/refresh');
  setToken(wrap.data.accessToken);
};

// User

// export const editUserWaterRate = createAsyncThunk(
//   'user/editWater',
//   async (data, thunkAPI) => {
//     console.log("enter");
//     try {
//       const response = await instanceWater.patch('/water/daily-norma', data);
//       toast.success('Your water rate changed successfully');
//       console.log("success");
//       return response.data;
//     } catch (error) {
//       console.log("error");
//       if (error.response?.data?.data?.message) {
//         return thunkAPI.rejectWithValue(error.response.data.data.message);
//       }
//       toast.error('Failed to change water rate');
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

export const updateWaterRate = async newWaterRate => {
  const { data } = await instanceWater.patch('water/daily-norma', {
    waterRate: newWaterRate,
  });
  return data;
};

export const getUser = async () => {
  const { data: wrap } = await instanceWater.get('/user');
  return wrap.data;
};

export const updateAvatar = async newPhotoFile => {
  const {
    data: { avatarURL },
  } = await instanceWater.patch('/user/avatar', newPhotoFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return avatarURL;
};

export const editUserInfo = async body => {
  const { data } = await instanceWater.patch('/user', body);
  return data;
};


export const deleteUser = async () => {
  await instanceWater.delete('/user/delete-account');
  unsetToken();
};

// Water
export const addWaters = async newWater => {
  const data = await instanceWater.post('/water/entry', newWater);

  console.log(data);

  return data;
};

export const editWater = async ({ newWaterUser, id }) => {
  const { data } = await instanceWater.patch(
    `/water/entry/${id}`,
    newWaterUser,
  );
  return data;
};

export const deleteWater = async id => {
  await instanceWater.delete(`/water/entry/${id}`);
};

export const fetchTodayWater = async () => {
  const { data: wrap } = await instanceWater.get('/water/today');
  return wrap.data;
};

export const fetchMonthWater = async month => {
  const { data: wrap } = await instanceWater.get(`/water/month/${month}`);
  return wrap.data;
};
