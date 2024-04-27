import { Link, useNavigate } from 'react-router-dom';
import flatpickr from 'flatpickr';
import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import { postJob } from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { getDataView } from '../../Helpers/API/Data/DataAPI';
import { takeJob } from '../../Helpers/API/Job/Designer/TakeJob';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  tanggal_pengumpulan: string;
  catatan: string;
  data_pendukung: any;
}

function GetJob(props: SimpleDialogProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    perusahaan,
    tanggal_kirim,
    tanggal_pengumpulan,
    catatan,
    data_pendukung,
  } = props;

  const [loading, setLoading] = useState(false);
  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose('');
  };

  dotStream.register();

  const token = localStorage.getItem('token');
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleGetData = async (nama: string) => {
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

  const handleTakeJob = async () => {
    setLoading(true);
    try {
      const take = await takeJob(token, kode, 1);
      notify('Take Job Successfully', 'success');
      setLoading(false);
      onClose('');
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
      setLoading(false);
      onClose('');
    }
  };
  useEffect(() => {
    setSelectedFiles(data_pendukung);
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className=" rounded-sm border border-stroke bg-white pl-5 pr-5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-black dark:text-white">
                Ambil Pekerjaan
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 ">
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
                  Tanggal Pengumpulan
                </label>

                <label className="ml-6 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                  {dateFormat(tanggal_pengumpulan, 'dddd, dd mmmm yyyy')}
                </label>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                  Data Pendukung
                </label>

                <div className="flex w-full text-left">
                  <span
                    className={`ml-4 mb-4.5 mr-7 ${
                      selectedFiles !== undefined && selectedFiles?.length === 7
                        ? 'w-70 h-15 overflow-x-scroll'
                        : ' flex justify-center items-center'
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

                <div className="mb-6">
                  <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                    Catatan
                  </label>
                  <label
                    className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {catatan === null ? 'Catatan tidak ada' : catatan}
                  </label>
                </div>
                <div className="items-center flex justify-center gap-10 mt-15">
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
                        onClick={handleTakeJob}
                        className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                      >
                        Ambil
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default GetJob;
