import { Link, useNavigate } from 'react-router-dom';
import flatpickr from 'flatpickr';
import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import { postJob } from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { getDataView } from '../../Helpers/API/Data/DataAPI';
import dateFormat from 'dateformat';
import Data from '../../layout/Data/GetData';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  catatan: string;
  data_pendukung: any;
}

function ViewJob(props: SimpleDialogProps) {
  const {
    onClose,
    open,
    nama,
    perusahaan,
    tanggal_kirim,
    catatan,
    data_pendukung,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose('');
  };

  useEffect(() => {
    // setSelectedFiles(data_pendukung);
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-black dark:text-white">
                Lihat Pekerjaan
              </h3>
            </div>
            <div className="p-10.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                  Nama
                </label>
                <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {nama}
                </label>

                <div className="mb-4.5">
                  <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                    Perusahaan
                  </label>
                  <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                    {perusahaan}
                  </label>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                  Tanggal Kirim
                </label>

                <label className="ml-6 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                  {dateFormat(tanggal_kirim, 'dddd, dd mmmm yyyy')}
                </label>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                  Data Pendukung
                </label>

                <Data 
                  data={data_pendukung}
                />
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                  Catatan
                </label>
                <label
                  className="ml-6 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {catatan === null ? 'Catatan tidak ada' : catatan}
                </label>
              </div>
              <div className="mt-20 items-right flex justify-end">
                <button
                  onClick={handleClose}
                  className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                >
                  Tutup
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </Dialog>
    // </DefaultLayout>
  );
}

export default ViewJob;
