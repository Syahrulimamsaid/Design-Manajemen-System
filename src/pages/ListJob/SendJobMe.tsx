import { Link, useNavigate } from 'react-router-dom';
import flatpickr from 'flatpickr';
import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import { postJob } from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { getDataView, getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { SlArrowDownCircle, SlCloudUpload, SlPicture } from 'react-icons/sl';
import { notify } from '../../Helpers/Notify/Notify';
import { SlTrash } from 'react-icons/sl';
import { designResult } from '../../Helpers/API/Job/Designer/ListJob';
import dateFormat from 'dateformat';
import Data from '../../layout/Data/GetData';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
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

function SendJob(props: SimpleDialogProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    job_kode,
    perusahaan,
    tanggal_kirim,
    tanggal_pengumpulan,
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
        setSelectedFiles(null);
        setLoading(false);
        onClose('');
      } catch (err: any) {
        // if (err instanceof Error) {
        notify(err.response.data.message, 'error');
        // }
        setLoading(false);
        setSelectedFiles(null);
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
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
            <div className="border-b border-[#7776ff] py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                Upload Job
              </h3>
            </div>
            <div className="p-5.5">
              <div className="pl-5 mb-4.5 flex flex-col gap-6 xl:flex-row w-full">
                <div className="w-full xl:w-1/2">
                  <div className="p-0">
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
                        className={`ml-5 mb-2.5 inline-flex rounded-full bg-opacity-15 py-1 px-3 text-sm font-bold bg-primary text-primary`}
                      >
                        Pengerjaan
                      </p>
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white flex text-center items-center gap-3">
                        Data Pendukung{' '}
                        {/* <Tooltip
                          children={
                            <p className="text-[#3236a8]">
                              <SlArrowDownCircle size={20} />
                            </p>
                          }
                          title={'Klik icon file untuk Download'}
                        /> */}
                        <p className="font-normal italic text-sm text-[#b3b1b1]">
                          || Tekan icon untuk download.
                        </p>
                      </label>
                      <Data data={data_pendukung} />
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
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
                        <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                          Upload File
                        </label>
                        <p className=" font-medium text-sm text-slate-500">
                          (png, jpg, jpeg, pdf, ai, psd, cdr)
                        </p>
                      </div>
                      <input
                        type="file"
                        id="fileInput"
                        accept=".png, .jpg, .jpeg, .ai, .psd, .cdr, .pdf"
                        style={{ display: 'none' }}
                        onChange={handleInputChange}
                      />
                      <Tooltip
                        children={
                          <div
                            onClick={handleFileSelect}
                            style={{ cursor: 'pointer' }}
                            className="bg-gray border-4 border-dashed my-4 border-slate-500 flex flex-col justify-center items-center h-full pl-20 pr-20 pb-10 pt-10 min-w-100 min-h-70"
                          >
                            {
                              <SlCloudUpload
                                size={100}
                                fill={!selectedFiles ? 'grey' : '#3b25ad'}
                              />
                            }
                            <p>
                              {selectedFiles != null && selectedFiles.length > 0
                                ? selectedFiles[0].name
                                : ''}
                            </p>
                          </div>
                        }
                        title={'Upload File'}
                      ></Tooltip>
                      {selectedFiles ? (
                        <Tooltip
                          children={
                            <button
                              className="p-3 rounded-lg bg-red-500 font-poppins font-medium text-slate-50 hover:bg-opacity-70 flex justify-center w-full gap-2"
                              onClick={() => setSelectedFiles(null)}
                            >
                              Delete
                              <SlTrash size={22} strokeWidth={25}/>
                            </button>
                          }
                          title="Hapus File"
                        ></Tooltip>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center flex justify-center ">
                {loading ? (
                  <div className="flex justify-center p-4">
                    <l-dot-stream
                      size="100"
                      speed="3"
                      color="#6456FE"
                    ></l-dot-stream>
                  </div>
                ) : (
                  <div className="flex justify-center w-full gap-7 mb-2">
                    <ButtonNegative text="Cancel" Click={handleClose} />

                    <ButtonPositive text="Upload" Click={handleDesignResult} />
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
