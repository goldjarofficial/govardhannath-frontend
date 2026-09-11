import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  timeout: 15000,

  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const storage =
      localStorage.getItem(
        'govardhannath-auth',
      );

    if (storage) {
      try {
        const parsed =
          JSON.parse(storage);

        const token =
          parsed?.state?.token;

        if (token) {
          config.headers.Authorization =
            `Bearer ${token}`;
        }
      } catch {
        // Ignore invalid storage
      }
    }
  }

  return config;
});

export default api;