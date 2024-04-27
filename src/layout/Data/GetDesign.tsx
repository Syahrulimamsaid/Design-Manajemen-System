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

  useEffect(() => {
  });

  return (
    <>
      <div className="" style={{ cursor: 'pointer' }}>
        {data_design ? (
          <Tooltip
            children={
              <div>
                <SlPicture
                  size={230}
                  className="w-full items-center"
                  fill="#00eb77"
                  onClick={handleGetDesignResult}
                />
              </div>
            }
            title="Klik untuk donwload"
          ></Tooltip>
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
    </>
  );
};

export default Design;
