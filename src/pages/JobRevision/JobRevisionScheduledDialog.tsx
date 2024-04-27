import { useEffect, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import { dotStream } from 'ldrs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tailChase } from 'ldrs';
import { notify } from '../../Helpers/Notify/Notify';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { jobRevisionScheduled } from '../../Helpers/API/Job/Koor/JobRevisionAPI';
import { convertStringToDate } from '../../Helpers/ConvertDate/ConvertDate';
import { getDesigner } from '../../Helpers/API/Designer/Designer';
import dateFormat from 'dateformat';
import {
  FormatDate,
  formattedDate,
} from '../../Helpers/ConvertDate/FormatDate';

export interface CancelResponseProps {
  open: boolean;
  onClose: (value: number) => void;
  kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  designer: string;
  komentar: string;
  status: number;
}

function RevisionDialog(props: CancelResponseProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    perusahaan,
    tanggal_kirim,
    designer,
    komentar,
    status,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    setTanggalPengumpulan('');
    onClose(0);
  };

  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [getDataDesigner, setDataDesigner] = useState<User[] | null>(null);
  const [statusTanggalPengumpulan, setStatusTanggalPengumpulan] =
    useState(false);
  dotStream.register();
  tailChase.register();

  const handleSelectedDate = (value: string) => {
    setTanggalPengumpulan(value);
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

  useEffect(() => {
    if (open) {
      handleGetDesigner();
      // console.log(tanggal_kirim);
    }
  }, [open]);

  const handleJobRevisionScheduled = async (event: React.FormEvent) => {
    event.preventDefault();
    if (tanggal_pengumpulan) {
      setLoading(true);
      try {
        await jobRevisionScheduled(token, kode, tanggal_pengumpulan);
        setLoading(false);
        onClose(0);
        notify('Berhasil menjadwalkan', 'success');
      } catch (err) {
        setLoading(false);
        onClose(0);
        setTanggalPengumpulan('');
        if (err instanceof Error) {
          notify(err.message, 'error');
        }
      }
    } else {
      setStatusTanggalPengumpulan(true);
      notify('Tanggal pengumpulan harus diisi', 'info');
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
                  Penjadwalan Revisi Pekerjaan
                </h3>
              </div>
              <div className="p-6.5 mb-4.5">
                <div className="flex justify-between">
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className=""> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Nama
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {nama}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Perusahaan
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {perusahaan}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Tanggal Kirim
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {dateFormat(tanggal_kirim, 'dddd, dd mmmm yyyy')}
                        {/* {tanggal_kirim} */}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className="p-6.5"> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Designer
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {designer}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                </div>  
                <div className="mt-5 mb-4.5">
                  <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                    Tanggal Pengumpulan Revisi{' '}
                    <Tooltip
                      children={<span className="text-meta-1">*</span>}
                      title="Bidang kolom ini harus diisi."
                    ></Tooltip>
                  </label>

                  <DatePicker
                    onDateChange={handleSelectedDate}
                    // status={statusTanggalPengumpulan}
                    dateSelected={tanggal_pengumpulan}
                    maxDate={convertStringToDate(formattedDate(tanggal_kirim))}
                  />
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
                {status == 1 ? (
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black font-poppins font-semibold dark:text-white">
                      Komenter Quality Control
                    </label>
                    <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                      {komentar}
                    </label>
                  </div>
                ) : (
                  ''
                )}
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
                      onClick={(event) => handleJobRevisionScheduled(event)}
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
        <ToastContainer autoClose={3000} />
      </Dialog>
    </>
    // </DefaultLayout>
  );
}
export default RevisionDialog;
