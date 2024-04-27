import URL from '../URL';

export async function getReport(token: string | null) {
  try {
    const res = await URL.get('/report', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getReportDesigner(token: string | null,kode:string|null) {
  try {
    const res = await URL.get(`/report/${kode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getDataCalendar(token: string | null) {
  try {
    const res = await URL.get(`/calendar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
