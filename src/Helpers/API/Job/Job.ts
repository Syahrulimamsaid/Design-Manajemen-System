import URL from '../URL';

export async function getJob(token: string | null) {
  try {
    const res = await URL.get(`/allJob`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
