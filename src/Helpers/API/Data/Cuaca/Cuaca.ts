import axios from 'axios';

export async function getCuaca() {
  try {
    const res = await axios.get(
    //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kudus,ID?key=ESSXYRPL9DHHRSZPKWMW8UURD`,
   'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kudus,ID/2024-05-06/2024-05-07?key=ESSXYRPL9DHHRSZPKWMW8UURD'
    );

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
