import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import { dotStream } from 'ldrs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tailChase } from 'ldrs';
import { SlPicture } from 'react-icons/sl';
import { getDesignResult } from '../../Helpers/API/Data/DataAPI';
import { responseCustomer } from '../../Helpers/API/Job/CS/FinallingJob';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';
import Design from '../../layout/Data/GetDesign';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import ButtonNegative from '../../layout/Button/ButtonNegative';
import ButtonPositive from '../../layout/Button/ButtonPositive';
import Swal from 'sweetalert2';

export interface ResponseProps {
  open: boolean;
  onClose: (value: number) => void;
  kode: string;
  job_kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  tanggal_pengumpulan: string;
  designer: string;
  hasil_design: string;
}

function ResponseJob(props: ResponseProps) {
  const {
    onClose,
    open,
    nama,
    job_kode,
    kode,
    perusahaan,
    tanggal_kirim,
    tanggal_pengumpulan,
    designer,
    hasil_design,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose(1);
  };

  const token = localStorage.getItem('token');
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [loading, setLoading] = useState(false);
  dotStream.register();
  tailChase.register();

  useEffect(() => {
    if (open) {
    }
  }, [open]);

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

  const handleResponseJob = async (
    event: React.FormEvent,
    tanggapan: number,
  ) => {
    onClose(1);
    Swal.fire({
      icon: 'question',
      title: 'Final',
      text: 'Yakin menyelesaikan pekerjaan ini ?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        event.preventDefault();
        setLoading(true);
        try {
          await responseCustomer(token, kode, tanggapan);
          setLoading(false);
          onClose(1);
          notify('Berhasil menanggapi', 'success');
        } catch (err) {
          setLoading(false);
          onClose(1);
          if (err instanceof Error) {
            notify(err.message, 'error');
          }
        }
      }
    });
  };

  const handleTo = (event: React.FormEvent) => {
    event.preventDefault();
    onClose(3);
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
              <div className="border-b border-[#342689] py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                  Job Finalling
                </h3>
              </div>
              <div className="p-3 mb-4.5 flex flex-col gap-6 xl:flex-row w-full">
                <div className="w-full xl:w-1/2">
                  <div className="p-6.5">
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
                        Tanggal Pengumpulan
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {dateFormatID(tanggal_pengumpulan)}
                      </label>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                        Designer
                      </label>
                      <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                        {designer}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-1/3">
                  <div className="p-6.5 flex justify-center items-center">
                    <Design data_design={hasil_design} />
                  </div>
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

                    <button
                      onClick={(event) => handleTo(event)}
                      className="flex w-full justify-center rounded rounded-lg bg-[#ff0d0d] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                    >
                      Reject
                    </button>
                    <ButtonPositive
                      text="Final"
                      Click={(event) => handleResponseJob(event, 2)}
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
export default ResponseJob;
