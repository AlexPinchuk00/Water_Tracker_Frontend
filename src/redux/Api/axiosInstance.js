import axios from 'axios';
import { setToken, unSetToken } from './api';

const API_URL = 'https://watertrackerbackend-5ymk.onrender.com';

const authInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Дозволяє автоматично передавати cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехоплювач помилок 401 (неавторизований) для оновлення токена
authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Оновлюємо токен, використовуючи cookies (сервер має правильно працювати з куками)
        const { data } = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });

        setToken(data.token); // Оновлюємо токен у локальному збереженні
        error.config.headers.Authorization = `Bearer ${data.token}`; // Додаємо новий токен до повторного запиту

        return authInstance.request(error.config); // Повторюємо запит з новим токеном
      } catch (refreshError) {
        unSetToken(); // Видаляємо токен, якщо refresh не вдався
        return Promise.reject(refreshError); // Викидаємо помилку далі
      }
    }
    return Promise.reject(error);
  }
);

export default authInstance;
