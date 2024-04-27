import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SlPicture } from 'react-icons/sl';

import { getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';
import Design from '../../layout/Data/GetDesign';

export interface ViewResponseProps {
  open: boolean;
  onClose: (value: string) => void;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  tanggal_pengumpulan: string;
  designer: string;
  hasil_design: string;
  status: number;
}

function ViewResponseJob(props: ViewResponseProps) {
  const {
    onClose,
    open,
    nama,
    perusahaan,
    tanggal_kirim,
    tanggal_pengumpulan,
    designer,
    hasil_design,
    status,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose('');
  };

  const token = localStorage.getItem('token');
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
    }
  }, [open]);

  const handleGetDesignResult = async () => {
    try {
      const design = await getDesignResult(token, hasil_design);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold font-poppins text-black dark:text-white">
                  Penyelesaian Pekerjaan
                </h3>
              </div>
              <div className="p-3 mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <div className="p-6.5">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Nama
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {nama}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Perusahaan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {perusahaan}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Tanggal Kirim
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {dateFormat(tanggal_kirim, 'dddd, dd mmmm yyyy')}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Tanggal Pengerjaan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {dateFormat(tanggal_pengumpulan, 'dddd, dd mmmm yyyy')}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Designer
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {designer}
                      </label>
                    </div>{' '}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Status
                      </label>
                      <p
                        className={`ml-5 inline-flex rounded-full bg-opacity-15 py-1 px-3 text-sm font-bold ${
                          status == 1
                            ? 'bg-danger text-danger'
                            : status == 2
                            ? 'bg-success text-success'
                            : 'bg-primary text-primary'
                        }`}
                      >
                        {status == 1
                          ? 'Ditolak'
                          : status == 2
                          ? 'Diterima'
                          : 'Belum Ditanggapi'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div className="p-6.5 flex justify-center items-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white text-center">
                        Hasil Pekerjaan
                      </label>
                      <Design data_design={hasil_design} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center flex justify-center p-6.5 w-full">
                <button
                  onClick={handleClose}
                  className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} />
      </Dialog>
    </>
  );
}
export default ViewResponseJob;
