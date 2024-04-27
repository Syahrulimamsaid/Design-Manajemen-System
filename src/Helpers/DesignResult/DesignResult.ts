import 'react-toastify/dist/ReactToastify.css';
import { getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { notify } from '../../Helpers/Notify/Notify';
import { useRef } from 'react';

export const handleGetDesignResult = async (
  token: string | null,
  nama: string,
) => {
  try {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const design = await getDesignResult(token, nama);
    const url = window.URL.createObjectURL(new Blob([design]));
    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = 'nama_file.txt';
      linkRef.current.click();
    }

    window.URL.revokeObjectURL(url);
  } catch (err) {
    if (err instanceof Error) {
      notify(err.message, 'error');
    }
  }
};
