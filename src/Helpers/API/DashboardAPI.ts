import URL from './URL';

export async function getDashboard(token: string | null) {
  try {
    const res = await URL.get('getdatadash', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function topDesigner(token: string | null) {
  try {
    const res = await URL.get('/topDesigner', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function detailAssignment(token: string | null) {
  try {
    const res = await URL.get('/detailAssignment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function commentCustomer(token: string | null) {
  try {
    const res = await URL.get('/commentCustomer', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function detailJob(token: string | null) {
  try {
    const res = await URL.get('/detailJob', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function detailQC(token: string | null) {
  try {
    const res = await URL.get('/detailQC', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function commentQC(token: string | null) {
  try {
    const res = await URL.get('/commentQC', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function urgentDeadline(token: string | null) {
  try {
    const res = await URL.get('/urgentDeadline', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}

export async function detailDesigner(token: string | null, kode :String | null) {
  try {
    const res = await URL.get(`/detailDesigner/${kode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
}
