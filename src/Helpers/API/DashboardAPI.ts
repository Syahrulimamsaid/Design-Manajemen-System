import URL from './URL';

export async function getDashboard(token: string | null) {
  try {
    const res = await URL.get('getdatadash', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
