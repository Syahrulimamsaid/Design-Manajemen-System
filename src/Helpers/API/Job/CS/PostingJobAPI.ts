import { FormatDate } from '../../../ConvertDate/FormatDate';
import URL from '../../URL';

export async function getJobPost(
  token: string | null,
): Promise<{ data: Job[] }> {
  try {
    const res = await URL.get('/getjobpost', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function postJob(
  token: string | null,
  nama: string,
  perusahaan: string,
  tanggal_kirim: string,
  catatan: string | null,
  konfirm: boolean | null,
): Promise<{ kode: string }> {
  try {
    const formattedDate = FormatDate(tanggal_kirim);

    const res = await URL.post(
      '/job',
      {
        nama: nama,
        perusahaan: perusahaan,
        tanggal_kirim: formattedDate,
        catatan: catatan,
        status_data: konfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return res.data;
  } catch (error: any) {
    // console.log(error);
    return Promise.reject(error);
  }
}

export async function confirmData(
  token: string | null,
  kode: string,
  status_data: boolean,
) {
  try {
    const res = await URL.patch(
      `/job/${kode}`,
      {
        status_data: status_data,
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

export async function deleteJob(token: string | null, kode: string) {
  try {
    const res = await URL.delete(`/job/${kode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.statusText;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function postData(
  token: string | null,
  job_kode: string,
  file: Blob,
) {
  try {
    const formData = new FormData();
    formData.append('job_kode', job_kode);
    formData.append('nama', file);
    const res = await URL.post('/data', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.statusText;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateJob(
  token: string | null,
  kode: string,
  nama: string,
  perusahaan: string,
  tanggal_kirim: string,
  catatan: string | null,
  konfirm: boolean | null,
) {
  try {
    const formattedDate = FormatDate(tanggal_kirim);

    const res = await URL.patch(
      `/job/${kode}`,
      {
        nama: nama,
        perusahaan: perusahaan,
        tanggal_kirim: formattedDate,
        catatan: catatan,
        status_data: konfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.statusText;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}
