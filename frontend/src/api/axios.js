import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api-nexabi.romitech.me/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interseptor: sisipkan token JWT otomatis di setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexabi_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interseptor: tangani error 401 (token expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Cek role user saat ini dari localStorage
    const role = localStorage.getItem('user_role');

    // 2. Jika error 401, seleksi kondisinya
    if (error.response?.status === 401) {
      // JIKA YANG LOGIN BUKAN ADMIN, baru jalankan logout otomatis
      if (role !== 'admin') {
        localStorage.removeItem('nexabi_token');
        localStorage.removeItem('nexabi_username');
        localStorage.removeItem('user_role');
        window.location.href = '/login';
      } else {
        // Jika dia adalah admin, biarkan saja errornya berlalu tanpa perlu logout paksa
        console.warn("Admin bypass mode: mengabaikan error 401 dari API backend.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
