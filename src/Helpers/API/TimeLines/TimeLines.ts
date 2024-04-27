import URL from '../URL';

export async function getTimelines(token: string | null, kode: string) {
  try {
    const res = await URL.get(`/timelines/${kode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
