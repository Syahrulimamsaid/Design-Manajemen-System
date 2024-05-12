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
import { convertStringToDate } from '../../Helpers/Date/ConvertDate';
import { getDesigner } from '../../Helpers/API/Designer/Designer';
import dateFormat from 'dateformat';
import { dateFormatID, formattedDate } from '../../Helpers/Date/FormatDate';
import ButtonNegative from '../../layout/Button/ButtonNegative';
import ButtonPositive from '../../layout/Button/ButtonPositive';

export interface CancelResponseProps {
  open: boolean;
  onClose: (value: number) => void;
  kode: string;
  job_kode: string;
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
    job_kode,
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
        setTanggalPengumpulan('');
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
      notify('Tanggal pengumpulan harus diisi', 'info');
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
              <div className="border-b border-[#7776ff] py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                  Penjadwalan Revisi Pekerjaan
                </h3>
              </div>
              <div className="p-6.5 mb-4.5">
                <div className="flex justify-between">
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className=""> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Kode
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {job_kode}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className=""> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Preparate
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {nama}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Customer
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {perusahaan}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                        Tanggal Kirim
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {dateFormatID(tanggal_kirim)}
                        {/* {tanggal_kirim} */}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className="p-6.5"> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
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
                  <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                    Tanggal Pengumpulan Revisi{' '}
                    <Tooltip
                      children={<span className="text-meta-1">*</span>}
                      title="Bidang kolom ini harus diisi."
                    ></Tooltip>
                  </label>

                  <DatePicker
                    onDateChange={handleSelectedDate}
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
                    <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
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
              <div className="items-center flex justify-center p-6.5 mt-35">
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

                    <ButtonPositive
                      text="Send"
                      Click={(event) => handleJobRevisionScheduled(event)}
                    />
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
