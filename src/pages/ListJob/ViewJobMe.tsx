import { Link, useNavigate } from 'react-router-dom';
import flatpickr from 'flatpickr';
import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import { postJob } from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { getDataView, getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { SlPicture } from 'react-icons/sl';
import { notify } from '../../Helpers/Notify/Notify';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  kode: string;
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

  const handleGetDesignResult = async () => {
    try {
      const design = await getDesignResult(token, hasil_design);
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

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-black dark:text-white">
                Lihat Pekerjaan
              </h3>
            </div>
            <div className="p-8.5">
              <div className="pl-5 mb-4.5 flex flex-col gap-6 xl:flex-row w-full">
                <div className="w-full xl:w-1/2">
                  <div className="p-0">
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
                        {tanggal_kirim}
                      </label>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Tanggal Pengerjaan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {tanggal_pengumpulan}
                      </label>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
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
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Data Pendukung
                      </label>

                      <div className="flex w-full text-left">
                        <span
                          className={`ml-4 mb-4.5 mr-7 text-left ${
                            selectedFiles !== undefined &&
                            selectedFiles?.length === 7
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
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Catatan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {catatan ? catatan : 'Tidak ada catatan.'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div className="p-6.5 flex justify-center items-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black  text-center dark:text-white">
                        Hasil Pekerjaan
                      </label>
                      <div className="" style={{ cursor: 'pointer' }}>
                        <SlPicture
                          size={230}
                          className="w-full items-center"
                          fill="#00eb77"
                          onClick={handleGetDesignResult}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center flex justify-center p-6.5">
                <div className="flex justify-center w-full gap-7">
                  <button
                    onClick={handleClose}
                    className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                  >
                    Oke
                  </button>
                </div>
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
