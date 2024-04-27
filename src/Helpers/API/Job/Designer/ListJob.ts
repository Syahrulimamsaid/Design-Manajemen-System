import URL from '../../URL';

export async function getAllJob(token: string | null) {
  try {
    const res = await URL.get('/joballme', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function designResult(
  token: string | null,
  kode: string | null,
  file: Blob,
) {
  try {
    const formData = new FormData();
    formData.append('hasil_design', file);
    const response = await URL.post(`/jobresult/${kode}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
