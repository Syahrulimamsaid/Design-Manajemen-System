import { useNavigate } from 'react-router-dom';
import URL from './URL';

export async function login(username: string, password: string) {
  try {
    const res = await URL.post('/login', {
      username: username,
      password: password,
    });

    const data = res.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('role', data.role);
    localStorage.setItem('nama', data.nama);
    localStorage.setItem('kode', data.kode);
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function logout(token: string|null) {
  try {
    const res = await URL.post(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('nama');
    localStorage.removeItem('kode');
  } catch (error: any) {
    return Promise.reject(error);
  }
}
