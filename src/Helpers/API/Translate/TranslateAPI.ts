import axios from "axios";

export async function translate(text: String | null) {
    try {
      const res = await axios.get(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|id`, {
      });
      return res.data;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }