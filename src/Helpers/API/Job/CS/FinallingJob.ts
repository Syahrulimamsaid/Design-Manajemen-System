import URL from '../../URL';

export async function getFinallingJob(
  token: string | null,
): Promise<{ data: JobAssignment[] }> {
  try {
    const res = await URL.get('/getjobfinalling', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function responseCustomer(
  token: string | null,
  kode: string,
  tanggapan: number,
) {
  try {

    const res = await URL.patch(
      `/finallingjob/${kode}`,
      {
        tanggapan_customer: tanggapan,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.statusText;
  } catch (error) {
    return Promise.reject(error);
  }
}
