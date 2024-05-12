import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import {  getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { SlPicture } from 'react-icons/sl';
import { notify } from '../../Helpers/Notify/Notify';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import Data from '../../layout/Data/GetData';
import Design from '../../layout/Data/GetDesign';
import ButtonNegative from '../../layout/Button/ButtonNegative';
import ButtonPositive from '../../layout/Button/ButtonPositive';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  kode: string;
  job_kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  tanggal_pengumpulan: string;
  status: string;
  catatan: string;
  data_pendukung: any;
  hasil_design: string;
}

function ViewJobMe(props: SimpleDialogProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    job_kode,
    perusahaan,
    tanggal_kirim,
    tanggal_pengumpulan,
    status,
    hasil_design,
    catatan,
    data_pendukung,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose('');
  };

  const token = localStorage.getItem('token');
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    // console.log(data_pendukung);
    setSelectedFiles(data_pendukung);
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
            <div className="border-b border-[#7776ff] py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                View Job
              </h3>
            </div>
            <div className="p-5.5">
              <div className="pl-5 flex flex-col gap-6 xl:flex-row w-full">
                <div className="w-full xl:w-1/2">
                  {/* <div className="p-0"> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Kode
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {job_kode}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Preparate
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {nama}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Customer
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {perusahaan}
                      </label>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                        Tanggal Kirim
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {dateFormatID(tanggal_kirim)}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                        Tanggal Pengerjaan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {dateFormatID(tanggal_pengumpulan)}
                      </label>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                        Status
                      </label>
                      <p
                        className={`ml-5 inline-flex rounded-full bg-opacity-15 py-1 px-3 text-sm font-bold ${
                          status === '6'
                            ? 'bg-success text-success'
                            : status === '4'
                            ? 'bg-purple-500 text-purple-500'
                            : status === '2'
                            ? 'bg-slate-500 text-slate-500'
                            : status === '0'
                            ? 'bg-pink-800 text-pink-800'
                            : 'bg-warning text-warning'
                        }`}
                      >
                        {status === '6'
                          ? 'Selesai'
                          : status === '4'
                          ? 'Dikumpulkan'
                          : status === '2'
                          ? 'Terjadwal'
                          : status === '0'
                          ? 'Pemeriksaan'
                          : 'Tidak Teridentifikasi'}
                      </p>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white flex text-center items-center gap-3">
                        Data Pendukung{' '}
                        <p className="font-normal italic text-sm text-[#b3b1b1]">
                          || Tekan icon untuk download.
                        </p>
                      </label>

                      <Data data={data_pendukung} />
                    </div>
                    <div className="">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                        Catatan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {catatan ? catatan : 'Tidak ada catatan.'}
                      </label>
                    </div>
                  {/* </div> */}
                </div>
                <div className="w-full xl:w-1/3">
                   <div className="p-6.5 flex justify-center items-center">
                    {/* <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650]  text-center dark:text-white">
                        Hasil Pekerjaan
                      </label>  */}
                      <Design 
                      data_design={hasil_design} />
                    {/* </div> */}
                  </div>
                </div>
              </div>
              </div>
              <div className="items-center flex justify-center p-6.5">
                <div className="flex justify-center w-full gap-7">
                  <ButtonPositive text='Close' Click={handleClose}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
    // </DefaultLayout>
  );
}

export default ViewJobMe;
