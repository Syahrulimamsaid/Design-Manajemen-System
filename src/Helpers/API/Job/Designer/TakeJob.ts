import Header from '../../../../components/Header';
import URL from '../../URL';

export async function getJob(token: string | null) {
  try {
    const res = await URL.get('/jobme', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function takeJob(
  token: string | null,
  kode: string,
  status: number,
) {
  try {
    const res = await URL.patch(
      `/takejob/${kode}`,
      { status: status },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
