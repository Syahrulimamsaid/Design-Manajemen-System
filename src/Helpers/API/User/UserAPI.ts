import URL from '../URL';

export async function getUser(token: string | null) {
  try {
    const res = await URL.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteUser(token: string | null,kode:string) {
  try {
    const res = await URL.delete(`/user/${kode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.status;
  } catch (error) {
    return Promise.reject(error);
  }
}