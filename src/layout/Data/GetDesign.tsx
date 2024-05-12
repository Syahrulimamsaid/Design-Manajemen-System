// File: DownloadButton.tsx
import React, { useEffect, useRef, useState } from 'react';
import { getDataView, getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { notify } from '../../Helpers/Notify/Notify';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { SlPicture } from 'react-icons/sl';

interface DesignProps {
  data_design: any;
}

const Design = (props: DesignProps) => {
  const { data_design } = props;

  const linkRef = useRef<HTMLAnchorElement>(null);
  const token = localStorage.getItem('token');

  const handleGetDesignResult = async () => {
    try {
      const design = await getDesignResult(token, data_design);
      
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

  useEffect(() => {});

  return (
    <>
      <div className="mb-4.5">
        <label className="mb-2.5 block font-poppins font-semibold text-black  text-center dark:text-white">
          File Hasil Pekerjaan
        </label>
        <div className="" style={{ cursor: 'pointer' }}>
          {data_design ? (
            <div className="text-center">
              {' '}
              <p className="fonr-medium text-md text-slate-400 italic">
                Klik area dibawah untuk download
              </p>
              <Tooltip
                children={
                  <div
                    onClick={handleGetDesignResult}
                    className="mt-5 border border-solid border-slate-500 bg-gray w-full flex flex-col justify-center items-center pl-15 pr-15 pt-10 pb-10 min-w-100 min-h-70"
                  >
                    <SlPicture fill="#3b25ad" size={150} />
                    <p>{data_design}</p>
                  </div>
                }
                title="Klik untuk donwload"
              ></Tooltip>
            </div>
          ) : (
            <Tooltip
              children={
                <div>
                  <SlPicture
                    size={230}
                    className="w-full items-center"
                    fill="grey"
                  />
                </div>
              }
              title="Hasil pekerjaan tidak ada"
            ></Tooltip>
          )}
        </div>
      </div>
    </>
  );
};

export default Design;
