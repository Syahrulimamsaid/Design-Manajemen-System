import axios from 'axios';

export async function getTanggalLibur() {
  try {
    const res = await axios.get('https://api-harilibur.vercel.app/api');
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
