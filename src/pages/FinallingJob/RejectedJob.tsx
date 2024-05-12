import { useEffect, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import { dotStream } from 'ldrs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tailChase } from 'ldrs';
import { notify } from '../../Helpers/Notify/Notify';
import { jobResponse } from '../../Helpers/API/Job/QC/CheckJob';
import Swal from 'sweetalert2';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { jobRevisionScheduled } from '../../Helpers/API/Job/Koor/JobRevisionAPI';
import { responseCustomer } from '../../Helpers/API/Job/CS/FinallingJob';
import ButtonNegative from '../../layout/Button/ButtonNegative';
import ButtonPositive from '../../layout/Button/ButtonPositive';

export interface CancelResponseProps {
  open: boolean;
  onClose: (value: number) => void;
  job_kode: string;
  kode: string;
  nama: string;
  perusahaan: string;
  designer: string;
  tanggal_kirim: string;
}

function RejectedJob(props: CancelResponseProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    job_kode,
    perusahaan,
    designer,
    tanggal_kirim,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose(0);
    setKomentar('');
  };
  const token = localStorage.getItem('token');
  const [komentar, setKomentar] = useState('');

  const [loading, setLoading] = useState(false);
  dotStream.register();
  tailChase.register();

  useEffect(() => {
    if (open) {
      console.log(tanggal_kirim);
    }
  }, [open]);

  const handleResponseJob = async (
    event: React.FormEvent,
    tanggapan: number,
  ) => {
    if (komentar) {
      onClose(0);
      Swal.fire({
        icon: 'question',
        title: 'Reject',
        text: 'Yakin menolak pekerjaan ini ?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          event.preventDefault();

          setLoading(true);

          try {
            await responseCustomer(token, kode, tanggapan, komentar);
            setLoading(false);
            onClose(0);
            setKomentar('');
            notify('Berhasil menanggapi', 'success');
          } catch (err) {
            setLoading(false);
            onClose(0);
            setKomentar('');
            if (err instanceof Error) {
              notify(err.message, 'error');
            }
          }
        }
        setKomentar('');
      });
    } else {
      notify('Komentar belum diisi', 'info');
    }
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold font-poppins text-[#201650]  dark:text-white">
                  Job Rejected
                </h3>
              </div>
              <div className="p-6.5 mb-4.5">
                <div className="flex justify-between">
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className=""> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650]  dark:text-white">
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
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650]  dark:text-white">
                        Preparate
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {nama}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className="p-6.5"> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650]  dark:text-white">
                        Customer
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {perusahaan}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    {/* <div className="p-6.5"> */}
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-[#201650]  dark:text-white">
                        Designer
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {designer}
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className="mt-6 min-w-80">
                  <label className="mb-2.5 block font-poppins font-semibold text-[#201650]  dark:text-white">
                    Komentar{' '}
                    <Tooltip
                      children={<span className="text-meta-1">*</span>}
                      title="Bidang kolom ini harus diisi."
                    ></Tooltip>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Masukkan komentar"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-[#201650]  outline-none transition focus:border-[#7776ff] active:border-[#7776ff] disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-[#7776ff]"
                    value={komentar}
                    onChange={(event) => setKomentar(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="items-center flex justify-center p-6.5">
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
                      Click={(event) => handleResponseJob(event, 1)}
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
export default RejectedJob;
