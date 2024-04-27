import { Link, useNavigate } from 'react-router-dom';
import flatpickr from 'flatpickr';
import { useEffect, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import {
  postData,
  postJob,
  updateJob,
} from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { deleteData, getData } from '../../Helpers/API/Data/DataAPI';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { tailChase } from 'ldrs';
import { notify } from '../../Helpers/Notify/Notify';
import { isText } from '../../Helpers/TextContent/TextContent';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  catatan: string;
  data_pendukung: any;
}

function UpdateJob(props: SimpleDialogProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    perusahaan,
    tanggal_kirim,
    catatan,
    data_pendukung,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    handleEmpty();
    onClose('');
  };

  const handleEmpty = () => {
    setNama('');
    setPerusahaan('');
    setTanggalKirim('');
    setCatatan('');
    setSelectedFiles(null);
    setStatusNama(false);
    setStatusPerusahaan(false);
    setStatusTanggalKirim(false);
    setKonfirm(false);
  };
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);
  dotStream.register();
  tailChase.register();

  const [namaGet, setNama] = useState('');
  const [perusahaanGet, setPerusahaan] = useState('');
  const [tanggalKirimGet, setTanggalKirim] = useState('');
  const [catatanGet, setCatatan] = useState('');
  const [konfirmGet, setKonfirm] = useState(false);

  const [loadingGetData, setLoadingGetData] = useState(false);

  const [statusNama, setStatusNama] = useState(false);
  const [statusPerusahaan, setStatusPerusahaan] = useState(false);
  const [statusTanggalKirim, setStatusTanggalKirim] = useState(false);

  const handleKonfirm = (event: React.FormEvent) => {
    event.preventDefault();
    setKonfirm(!konfirmGet);
  };

  useEffect(() => {
    if (open) {
      setNama(nama);
      setPerusahaan(perusahaan);
      const selectedDate = new Date(tanggal_kirim);
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
      setTanggalKirim(formattedDate);
      setCatatan(catatan);
      handleGetFiles();
    }
  }, [open]);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleGetFiles = async () => {
    if (data_pendukung) {
      setLoadingGetData(true);
      const newFiles = new DataTransfer();
      for (const data of data_pendukung) {
        try {
          const blob = await getData(token, data.nama);
          const file = new File([blob], data.nama);
          newFiles.items.add(file);
        } catch (error) {
          console.error(`Error while fetching file ${data.nama}:`, error);
        }
      }
      setSelectedFiles(newFiles.files);

      setLoadingGetData(false);
    }
  };

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
      setSelectedFiles((prevFiles) => {
        return prevFiles ? mergeFileLists(prevFiles, files) : files;
      });
    }
  };

  const mergeFileLists = (
    fileList1: FileList,
    fileList2: FileList,
  ): FileList => {
    const mergedList = new DataTransfer();
    for (let i = 0; i < fileList1.length; i++) {
      mergedList.items.add(fileList1[i]);
    }
    for (let i = 0; i < fileList2.length; i++) {
      mergedList.items.add(fileList2[i]);
    }
    return mergedList.files;
  };

  const handleUpdateJob = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!namaGet && !perusahaanGet && !tanggalKirimGet) {
    //   setStatusNama(true);
    //   setStatusPerusahaan(true);
    //   setStatusTanggalKirim(true);
    //   notify('Nama harus diisi', 'error');
    //   notify('Perusahaan harus diisi', 'error');
    //   notify('Tanggal Kirim harus diisi', 'error');
    // } else if (!namaGet && !perusahaanGet) {
    //   setStatusNama(true);
    //   setStatusPerusahaan(true);
    //   setStatusTanggalKirim(false);
    //   notify('Nama harus diisi', 'error');
    //   notify('Perusahaan harus diisi', 'error');
    // } else if (!namaGet && !tanggalKirimGet) {
    //   setStatusNama(true);
    //   setStatusPerusahaan(false);
    //   setStatusTanggalKirim(true);
    //   notify('Nama harus diisi', 'error');
    //   notify('Tanggal Kirim harus diisi', 'error');
    // } else if (!perusahaanGet && !tanggalKirimGet) {
    //   setStatusNama(false);
    //   setStatusPerusahaan(true);
    //   setStatusTanggalKirim(true);
    //   notify('Perusahaan harus diisi', 'error');
    //   notify('Tanggal Kirim harus diisi', 'error');
    // } else if (!namaGet) {
    //   setStatusNama(true);
    //   setStatusPerusahaan(false);
    //   setStatusTanggalKirim(false);
    //   notify('Nama harus diisi', 'error');
    // } else if (!perusahaanGet) {
    //   setStatusNama(false);
    //   setStatusPerusahaan(true);
    //   setStatusTanggalKirim(false);
    //   notify('Perusahaan harus diisi', 'error');
    // } else if (!tanggalKirimGet) {
    //   setStatusNama(false);
    //   setStatusPerusahaan(false);
    //   setStatusTanggalKirim(true);
    //   notify('Tanggal Kirim harus diisi', 'error');
    // } else {
    //   setStatusNama(false);
    //   setStatusPerusahaan(false);
    //   setStatusTanggalKirim(false);

    if (!namaGet || !perusahaanGet || !tanggalKirimGet) {
      notify('Data belum lengkap', 'info');
    } else if (namaGet && perusahaanGet && tanggalKirimGet) {

      if (isText(namaGet) == false) {
        notify('Nama harus mengandung Alfabet', 'info');
      } else if (isText(perusahaanGet) == false) {
        notify('Perusahaan harus mengandung Alfabet', 'info');
      } else {
        setTimeout(() => {
          setLoading(true);
        }, 400);

        try {
          await updateJob(
            token,
            kode,
            namaGet,
            perusahaanGet,
            tanggalKirimGet,
            catatanGet,
            konfirmGet,
          );

          if (
            selectedFiles &&
            selectedFiles.length > 0 &&
            selectedFiles !== data_pendukung
          ) {
            for (const data of data_pendukung) {
              try {
                await deleteData(token, data.id);
              } catch (err) {
                setLoading(false);
                onClose('');
                handleEmpty();
                if (err instanceof Error) {
                  notify(err.message, 'error');
                }
              }
            }

            for (const file of selectedFiles) {
              try {
                await postData(token, kode, file);
              } catch (err) {
                setLoading(false);
                onClose('');
                handleEmpty();
                if (err instanceof Error) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Data Pendukung',
                    text: err.message,
                    confirmButtonText: 'Ok',
                  }).then((res) => {
                    if (res.isConfirmed) {
                    }
                  });
                }
              }
            }
          }

          setLoading(false);
          onClose('');
          handleEmpty();
          notify('Ubah data berhasil', 'success');
        } catch (err) {
          setLoading(false);
          onClose('');
          handleEmpty();
          if (err instanceof Error) {
            notify(err.message, 'error');
          }
        }
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    if (selectedFiles) {
      const newFiles = new DataTransfer();
      for (let i = 0; i < selectedFiles.length; i++) {
        if (i !== index) {
          newFiles.items.add(selectedFiles.item(i)!);
        }
      }
      setSelectedFiles(newFiles.files);
    }
  };

  const handleSelectedDate = (value: string) => {
    console.log(value);
    setTanggalKirim(value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold font-poppins text-black dark:text-white">
                  Ubah Pekerjaan
                </h3>
              </div>
              <form className="w-full" onSubmit={handleUpdateJob}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Nama{' '}
                        <Tooltip
                          children={<span className="text-meta-1">*</span>}
                          title="Bidang kolom ini harus diisi."
                        ></Tooltip>
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan nama pekerjaan"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#00eb77] ${
                          statusNama === true
                            ? 'border-[#ff0d0d] focus:border-[#ff0d0d] active:border-[#ff0d0d]'
                            : 'focus:border-[#00eb77] active:border-[#00eb77]'
                        }`}
                        value={namaGet}
                        onChange={(event) => setNama(event.target.value)}
                        style={{ borderColor: statusNama ? '#ff0d0d' : '' }}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Perusahaan{' '}
                        <Tooltip
                          children={<span className="text-meta-1">*</span>}
                          title="Bidang kolom ini harus diisi."
                        ></Tooltip>
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan nama perusahaan"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#00eb77] ${
                          statusPerusahaan === true
                            ? 'border-[#ff0d0d] focus:border-[#ff0d0d] active:border-[#ff0d0d]'
                            : 'focus:border-[#00eb77] active:border-[#00eb77]'
                        }`}
                        value={perusahaanGet}
                        onChange={(event) => setPerusahaan(event.target.value)}
                        style={{
                          borderColor: statusPerusahaan ? '#ff0d0d' : '',
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                      Tanggal Kirim{' '}
                      <Tooltip
                        children={<span className="text-meta-1">*</span>}
                        title="Bidang kolom ini harus diisi."
                      ></Tooltip>
                    </label>

                    <DatePicker
                      onDateChange={handleSelectedDate}
                      status={statusTanggalKirim}
                      dateSelected={tanggalKirimGet}
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black font-poppins fon  t-semibold dark:text-white">
                      Data Pendukung
                    </label>
                    <div className="flex justify-between items-center">
                      <div className="flex w-full items-center">
                        <span
                          className={`mr-7 flex ${
                            selectedFiles !== undefined &&
                            selectedFiles?.length === 7
                              ? 'w-70 h-15 overflow-x-scroll'
                              : ''
                          }`}
                        >
                          {loadingGetData === true ? (
                            <l-tail-chase
                              size="35"
                              speed="1.75"
                              color="green"
                            ></l-tail-chase>
                          ) : (
                            selectedFiles &&
                            Array.from(selectedFiles).map((file, index) => (
                              <Tooltip key={index} title={file.name}>
                                <div className="relative inline-block">
                                  <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-slate-300 text-black font-bold rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                    onClick={(event) => handleRemoveFile(index)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512"
                                      width={10}
                                      height={10}
                                    >
                                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                  </button>
                                  <img
                                    src="src/images/icon/file-solid.svg"
                                    alt={`File ${index + 1}`}
                                    className="ml-2 w-10 h-10"
                                  />
                                </div>
                              </Tooltip>
                            ))
                          )}
                        </span>

                        <Tooltip
                          children={
                            <div>
                              <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleInputChange}
                                multiple
                              />

                              <button
                                type="button"
                                className="flex justify-center items-center rounded rounded-full bg-slate-200 w-7 h-7 hover:bg-slate-300"
                                onClick={handleFileSelect}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  height={15}
                                  width={15}
                                  fill="#565656"
                                >
                                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                </svg>
                              </button>
                            </div>
                          }
                          title="Tambah file"
                        ></Tooltip>
                      </div>
                      {selectedFiles === null || selectedFiles.length === 0 ? (
                        ''
                      ) : (
                        <span className="ml-10 w-60">
                          <button
                            type="button"
                            className={`flex w-full justify-center rounded rounded-lg border p-1 font-poppins font-reguler ${
                              konfirmGet === true
                                ? 'border-[#00eb77] text-[#00eb77]'
                                : 'border-slate-400 text-slate-400'
                            } hover:bg-slate-100`}
                            onClick={handleKonfirm}
                          >
                            Konfirmasi Data
                          </button>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                      Catatan
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Masukkan catatan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#00eb77] active:border-[#00eb77] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#00eb77]"
                      value={catatanGet}
                      onChange={(event) => setCatatan(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="items-centerx flex justify-center">
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
                          type="button"
                          className="flex w-full justify-center rounded bg-slate-50 rounded-lg border border-slate-400 p-3 font-poppins font-medium text-slate-700 hover:bg-slate-100"
                          onClick={handleClose}
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                        >
                          Ubah
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} />
      </Dialog>
    </>
    // </DefaultLayout>
  );
}

export default UpdateJob;
