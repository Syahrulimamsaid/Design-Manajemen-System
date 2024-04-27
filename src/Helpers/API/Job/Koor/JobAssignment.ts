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

export async function jobShceduled(
  token: string | null,
  kode: string,
  designer: string,
  tanggal_pengumpulan: string,
) {
  try {
    const selectedDate = new Date(tanggal_pengumpulan);
    const formattedDate = selectedDate.toISOString().split('T')[0];
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
