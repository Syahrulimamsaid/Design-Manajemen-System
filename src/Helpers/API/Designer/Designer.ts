import URL from '../URL';

export async function getDesigner(token: string | null) {
  try {
    const res = await URL.get('/designer', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
