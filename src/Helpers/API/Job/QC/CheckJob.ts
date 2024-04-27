import { FormatDate } from '../../../ConvertDate/FormatDate';
import URL from '../../URL';

export async function getCheck(token: string | null) {
  try {
    const res = await URL.get('/jobcheck', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function jobResponse(
  token: string | null,
  kode: string,
  status: number,
  komentar: string | null,
) {
  try {
    const res = await URL.post(
      `/jobrevision/${kode}`,
      { status: status, komentar: komentar },
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
