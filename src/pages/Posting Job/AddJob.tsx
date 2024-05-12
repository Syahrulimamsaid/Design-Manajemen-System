import { useEffect, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import { postData, postJob } from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { notify } from '../../Helpers/Notify/Notify';
import { getDesigner } from '../../Helpers/API/Designer/Designer';
import { isText } from '../../Helpers/TextContent/TextContent';
import { getAllData } from '../../Helpers/API/Data/DataAPI';
import ButtonPositive from '../../layout/Button/ButtonPositive';
import ButtonNegative from '../../layout/Button/ButtonNegative';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

function AddJob(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const [statusNama, setStatusNama] = useState(false);
  const [statusPerusahaan, setStatusPerusahaan] = useState(false);
  const [statusTanggalKirim, setStatusTanggalKirim] = useState(false);
  const [allData, setAllData] = useState<DataPendukung[] | null>(null);

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
    setKonfirm(false);
    setStatusNama(false);
    setStatusPerusahaan(false);
    setStatusTanggalKirim(false);
  };

  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);
  dotStream.register();

  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [catatan, setCatatan] = useState('');
  const [konfirm, setKonfirm] = useState(false);
  const [getDataDesigner, setDataDesigner] = useState<User[] | null>(null);

  useEffect(() => {
    if (open) {
      handleGetDesigner();
      handleGetAllData();
    }
  }, [open]);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileSelect = (event: React.FormEvent) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      if (event.target && event.target.files) {
        const files = event.target.files;
  
        for (let i = 0; i < files.length; i++) {
          const file = files[i]; 
          const isFileExist = allData?.some((data) => data.nama === file.name);
  
          if (isFileExist) {
            notify(`${file.name} sudah ada di penyimpanan`, 'error');
          } else {
            setSelectedFiles((prevFiles) => {
              const updatedFiles = prevFiles ? mergeFileLists(prevFiles, [file]) : [file];
              return updatedFiles;
            });
          }
        }
      } else {
        notify('gagal', 'error');
      }
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
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

  const handlerInsertJob = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nama || !perusahaan || !tanggalKirim) {
      notify('Data belum lengkap', 'info');
    } else if (nama && perusahaan && tanggalKirim) {
      if (isText(nama) == false) {
        notify('Nama harus mengandung Alfabet', 'info');
      } else if (isText(perusahaan) == false) {
        notify('Perusahaan harus mengandung Alfabet', 'info');
      } else {
        setTimeout(() => {
          setLoading(true);
        }, 400);

        try {
          const insertJob = await postJob(
            token,
            nama,
            perusahaan,
            tanggalKirim,
            catatan,
            konfirm,
          );

          if (selectedFiles && selectedFiles.length > 0) {
            for (const file of selectedFiles) {
              try {
                await postData(token, insertJob.kode, file);
                setLoading(false);
                handleEmpty();
                onClose('');
              } catch (err) {
                setLoading(false);
                handleEmpty();
                onClose('');
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
          handleEmpty();
          setLoading(false);
          onClose('');
        } catch (err:any) {
          setLoading(false);
          onClose('');
          handleEmpty();
          // if (err instanceof Error) {
            Swal.fire({
              icon: 'error',
              title: 'Tambah Pekerjaan',
              // text: 'Preparate Job sudah tersedia.',
              text: err.response.data.message,
              confirmButtonText: 'Ok',
            }).then((res) => {
              if (res.isConfirmed) {
              }
            });
          // }
        }
      }
    } else {
    }
  };

  const handleGetDesigner = async () => {
    try {
      const data = await getDesigner(token);
      setDataDesigner(data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
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

  const handleKonfirm = (event: React.FormEvent) => {
    event.preventDefault();
    setKonfirm(!konfirm);
  };

  const handleSelectedDate = (value: string) => {
    setTanggalKirim(value);
  };

  const handleGetAllData = async () => {
    try {
      const data = await getAllData(token);
      setAllData(data.data);
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
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
              <div className="border-b border-[#342689] py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                  Add Job
                </h3>
              </div>
              <form className="w-full">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Preparate{' '}
                        <Tooltip
                          children={<span className="text-meta-1">*</span>}
                          title="Bidang kolom ini harus diisi."
                        ></Tooltip>
                      </label>
                      <input
                        type="text"
                        // required
                        placeholder="Masukkan nama pekerjaan"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-blue outline-none transition disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#7776ff] ${
                          statusNama === true
                            ? 'border-[#ff0d0d] focus:border-[#ff0d0d] active:border-[#ff0d0d]'
                            : 'focus:border-[#7776ff] active:border-[#7776ff]'
                        }`}
                        value={nama}
                        onChange={(event) => setNama(event.target.value)}
                        style={{ borderColor: statusNama ? '#ff0d0d' : '' }}
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Customer{' '}
                        <Tooltip
                          children={<span className="text-meta-1">*</span>}
                          title="Bidang kolom ini harus diisi."
                        ></Tooltip>
                      </label>
                      <input
                        type="text"
                        // required
                        placeholder="Masukkan nama perusahaan"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-[#201650] outline-none transition  disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#7776ff] ${
                          statusPerusahaan === true
                            ? 'border-[#ff0d0d] focus:border-[#ff0d0d] active:border-[#ff0d0d]'
                            : 'focus:border-[#7776ff] active:border-[#7776ff]'
                        }`}
                        value={perusahaan}
                        onChange={(event) => setPerusahaan(event.target.value)}
                        style={{
                          borderColor: statusPerusahaan ? '#ff0d0d' : '',
                        }}
                      />
                    </div>
                  </div>
                  {getDataDesigner?.map((designer, index) => (
                    <option
                      style={{ display: 'none' }}
                      key={index}
                      value={designer.kode}
                      className="text-body dark:text-bodydark"
                    >
                      {designer.nama}
                    </option>
                  ))}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                      Tanggal Kirim{' '}
                      <Tooltip
                        children={<span className="text-meta-1">*</span>}
                        title="Bidang kolom ini harus diisi."
                      ></Tooltip>
                    </label>
                    <DatePicker
                      onDateChange={handleSelectedDate}
                      status={statusTanggalKirim}
                      maxDate={new Date(new Date().getFullYear(), 11, 31)}
                      dateSelected={tanggalKirim}
                      // isRequired={true}
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
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
                          {selectedFiles &&
                            Array.from(selectedFiles).map((file, index) => (
                              <Tooltip key={index} title={file.name}>
                                <div className="relative inline-block">
                                  <button
                                    className="absolute top-0 right-0 bg-slate-300 text-[#201650] font-bold rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
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
                                    src="src/images/icon/file.svg"
                                    alt={`File ${index + 1}`}
                                    className="ml-2 w-10 h-10"
                                  />
                                </div>
                              </Tooltip>
                            ))}
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
                            onClick={handleKonfirm}
                            className={`flex w-full justify-center rounded rounded-lg border p-1 font-poppins font-reguler ${
                              konfirm === true
                                ? 'border-[#492AD8] text-[#ECEFFF] bg-[#492AD8] hover:bg-[#6456FE]'
                                : 'border-slate-400 text-slate-400 hover:bg-slate-100'}`}
                            // onClick={han}
                          >
                            Konfirmasi Data
                          </button>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                      Catatan
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Masukkan catatan"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-[#201650] outline-none transition focus:border-[#7776ff] active:border-[#7776ff] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#7776ff]"
                      value={catatan}
                      onChange={(event) => setCatatan(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="items-center flex justify-center">
                    {loading ? (
                      <div className="flex justify-center p-4">
                        <l-dot-stream
                          size="100"
                          speed="3"
                          color="#6456FE"
                        ></l-dot-stream>
                      </div>
                    ) : (
                      <div className="flex justify-center w-full gap-7">
                        <ButtonNegative text="Cancel" Click={handleClose} />
                        <ButtonPositive text="Add" Click={handlerInsertJob} />
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

export default AddJob;
