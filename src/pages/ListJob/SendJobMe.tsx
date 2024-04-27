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
import { SlTrash } from 'react-icons/sl';
import { designResult } from '../../Helpers/API/Job/Designer/ListJob';
import dateFormat from 'dateformat';
import Data from '../../layout/Data/GetData';

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

function SendJob(props: SimpleDialogProps) {
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
    setSelectedFiles(null);
    onClose('');
  };

  const token = localStorage.getItem('token');
  // const linkRef = useRef<HTMLAnchorElement>(null);
  const [loading, setLoading] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {});

  const handleFileSelect = (event: React.FormEvent) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target && event.target.files) {
      const files = event.target.files;
      setSelectedFiles(files);
    }
  };

  const handleDesignResult = async () => {
    if (selectedFiles) {
      setLoading(true);
      try {
        for (const file of selectedFiles) {
          await designResult(token, kode, file);
        }
        notify('Pekerjaan berhasil dikirim', 'success');
        setLoading(false);
        onClose('');
      } catch (err) {
        if (err instanceof Error) {
          notify(err.message, 'error');
        }
        setLoading(false);
        onClose('');
      }
    } else {
      notify('File belum diUnggah', 'info');
    }
  };
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-black dark:text-white">
                Kirim Pekerjaan
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
                        Status
                      </label>
                      <p
                        className={`ml-5 mb-2.5 inline-flex rounded-full bg-opacity-15 py-1 px-3 text-sm font-bold bg-primary text-primary`}
                      >
                        Pengerjaan
                      </p>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                        Data Pendukung
                      </label>
                      <Data data={data_pendukung} />
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
                  <div className="p-6.5 flex flex-col justify-center items-center text-center">
                    <div className="mb-4.5">
                      <div>
                        <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                          Unggah Pekerjaan
                        </label>
                        <p className=" font-medium text-sm text-slate-500">
                          (png, jpg, jpeg, ai, psd, cdr)
                        </p>
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        accept=".png, .jpg, .jpeg, .ai, .psd, .cdr"
                        style={{ display: 'none' }}
                        onChange={handleInputChange}
                      />
                      <Tooltip
                        children={
                          <div style={{ cursor: 'pointer' }}>
                            <SlPicture
                              size={230}
                              className="mb-8 hover:opacity-80"
                              fill={selectedFiles ? '#00eb77' : 'grey'}
                              onClick={handleFileSelect}
                            />
                          </div>
                        }
                        title={
                          selectedFiles
                            ? 'Unggahan File Pekerjaan'
                            : 'Unggah File Pekerjaan'
                        }
                      ></Tooltip>
                      {selectedFiles ? (
                        <Tooltip
                          children={
                            <button
                              className="p-3 rounded-lg bg-[#00eb77] font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                              onClick={() => setSelectedFiles(null)}
                            >
                              <SlTrash size={20} />
                            </button>
                          }
                          title="Hapus Unggahan File Pekerjaan"
                        ></Tooltip>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center flex justify-center p-6.5">
                {loading ? (
                  <div className="flex justify-center p-4">
                    <l-dot-stream
                      size="100"
                      speed="3"
                      color="green"
                    ></l-dot-stream>
                  </div>
                ) : (
                  <div className="flex justify-center w-full gap-7">
                    <button
                      className="flex w-full justify-center rounded bg-slate-50 rounded-lg border border-slate-400 p-3 font-poppins font-medium text-slate-700 hover:bg-slate-100"
                      onClick={handleClose}
                    >
                      Batal
                    </button>

                    <button
                      onClick={handleDesignResult}
                      className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                    >
                      Kirim
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
    // </DefaultLayout>
  );
}

export default SendJob;
