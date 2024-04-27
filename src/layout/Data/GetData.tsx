// File: DownloadButton.tsx
import React, { useEffect, useRef, useState } from 'react';
import { getDataView } from '../../Helpers/API/Data/DataAPI';
import { notify } from '../../Helpers/Notify/Notify';
import Tooltip from '@mui/material/Tooltip/Tooltip';

interface DataProps {
  data: any;
}

const Data = (props: DataProps) => {
  const { data } = props;

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleGetData = async (nama:string) => {
    const token = localStorage.getItem('token');
    try {
      const data = await getDataView(token, nama);
      const url = window.URL.createObjectURL(new Blob([data]));
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

  useEffect(() => {
    setSelectedFiles(data);
  });
  
  return (
    <>
      <div className="flex w-full text-left">
        <span
          className={`ml-4 mb-2.5 mr-7 text-left ${
            selectedFiles !== undefined && selectedFiles?.length === 7
              ? 'w-70 h-15 overflow-x-scroll'
              : 'flex justify-center items-center'
          }`}
        >
          {selectedFiles?.length === 0 ? (
            <label
              className="block font-poppins font-medium text-slate-600 dark:text-white"
              style={{ whiteSpace: 'nowrap' }}
            >
              Data tidak ada
            </label>
          ) : (
            selectedFiles &&
            Array.from(selectedFiles).map((file, index) => (
              <Tooltip key={index} title={file.nama}>
                <img
                  onClick={() => handleGetData(file.nama)}
                  src="src/images/icon/file-solid.svg"
                  alt={`File ${index + 1}`}
                  className="ml-2 w-8 h-8"
                  style={{ cursor: 'pointer' }}
                />
              </Tooltip>
            ))
          )}
        </span>

        <span className="ml-20 w-60"></span>
      </div>
    </>
  );
};

export default Data;
