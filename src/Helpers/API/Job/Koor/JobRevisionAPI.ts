import { FormatDate } from '../../../ConvertDate/FormatDate';
import URL from '../../URL';

export async function getRevision(token: string | null) {
  try {
    const res = await URL.get('/jobrevision', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
} 

export async function getJobRejected(token: string | null) {
  try {
    const res = await URL.get('/jobrejected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
} 

export async function jobRevisionScheduled(
  token: string | null,
  kode: string,
  tanggal_pengumpulan: string,
) {
  try {
    
    const formattedDate = FormatDate(tanggal_pengumpulan);

    const res = await URL.patch(
      `/jobrevisionschedulling/${kode}`,
      {
        tanggal_pengumpulan: formattedDate
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
