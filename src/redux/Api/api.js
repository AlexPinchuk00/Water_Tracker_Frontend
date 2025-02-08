import authInstance  from './axiosInstance';

// ==============================
//            AUTH
// ==============================
const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const unsetToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Реєстрація користувача
export const signup = async (body) => {
  const { data } = await authInstance.post('/auth/signup', body);
  setToken(data.token);
  return data;
};

// Вхід користувача
export const signin = async (body) => {
  const { data } = await authInstance.post('/auth/signin', body);
  setToken(data.token);
  return data;
};

// Вихід користувача
export const logout = async () => {
  await authInstance.post('/auth/logout');
  unSetToken();
};

// // Оновлення токена якщо витягнемо з кукі видалити це
// export const refresh = async (token) => {
//   const { data } = await authInstance.get('/auth/refresh', {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   setToken(data.token);
//   return data;
// };

// ==============================
//            USER
// ==============================

// Оновлення щоденної цілі споживання води
export const updateDailyGoal = async (newDailyGoal) => {
  const { data } = await authInstance.patch('/daily-norma', {
    dailyGoal: newDailyGoal,
  });
  return data;
};

// Оновлення аватара користувача
export const updateUserAvatar = async (newAvatarFile) => {
  const formData = new FormData();
  formData.append('avatar', newAvatarFile);

  const {
    data: { avatarURL },
  } = await authInstance.patch('/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return avatarURL;
};

// Оновлення даних користувача
export const updateUser = async (body) => {
  const { data } = await authInstance.patch('/user', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data;
};

// Отримання інформації про користувача
export const getUser = async (params) => {
  const { data } = await authInstance.get('/user', { params });
  return data;
};

// ==============================
//            WATER
// ==============================

// Додавання нового запису про воду
export const addEntry = async (newEntry) => {
  const { data } = await authInstance.post('/water', newEntry, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

// Оновлення існуючого запису про воду
export const updateEntry = async ({ newEntry, id }) => {
  const { data } = await authInstance.patch(`/water/entry/${id}`, newEntry, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

// Видалення запису про воду
export const deleteEntry = async (id) => {
  await authInstance.delete(`/water/entry/${id}`);
};

// Отримання даних про споживання води за сьогодні
export const getToday = async () => {
  const { data } = await authInstance.get('/today');
  return data;
};

// Отримання статистики за місяць
export const getMonthStatistics = async (date) => {
  const { data } = await authInstance.get(`/month/${date}`);
  return data;
};
