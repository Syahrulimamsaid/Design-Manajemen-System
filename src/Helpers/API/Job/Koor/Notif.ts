
import URL from '../../URL';

export async function getRevisionNotif(token: string | null) {
  try {
    const res = await URL.get('/revisionNotif', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getCheckNotif(token: string | null) {
  try {
    const res = await URL.get('/checkNotif', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
} 
