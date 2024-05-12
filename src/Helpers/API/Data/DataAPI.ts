import URL from '../URL';

export async function deleteData(token: string | null, id: number) {
  try {
    const res = URL.delete(`/data/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // return (await res).status;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getDataView(token: string | null, nama: string) {
  try {
    const res = await URL.get(`/data/${nama}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([res.data]);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nama);

    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(url);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getData(
  token: string | null,
  nama: string,
): Promise<Blob> {
  try {
    const res = await URL.get(`/data/${nama}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([res.data]);
    return blob;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getDesignResult(token: string | null, nama: string) {
  try {
    const res = await URL.get(`/design/${nama}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = new Blob([res.data]);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', nama);

    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(url);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAllData(token: string | null) {
  try {
    const res = await URL.get(`/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
