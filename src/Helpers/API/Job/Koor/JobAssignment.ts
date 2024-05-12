import { FormatDate } from '../../../Date/FormatDate';
import URL from '../../URL';

export async function getJobAssignment(token: string | null) {
  try {
    const res = await URL.get('/job', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function jobOnProgress(token: string | null,kode:string) {
  try {
    const res = await URL.get(`/jobOnProgress/${kode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function jobShceduled(
  token: string | null,
  kode: string,
  designer: string,
  tanggal_pengumpulan: string,
) {
  try {
    const formattedDate = FormatDate(tanggal_pengumpulan);
    const res = await URL.post(
      '/jobschedulling',
      {
        job_kode: kode,
        designer_kode: designer,
        tanggal_pengumpulan: formattedDate,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
