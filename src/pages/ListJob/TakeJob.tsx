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
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import Data from '../../layout/Data/GetData';
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
  catatan: string;
  data_pendukung: any;
}

function TakeJob(props: SimpleDialogProps) {
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
          <div className=" rounded-sm border border-stroke bg-white pl-2 pr-2 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-[#7776ff] py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                Take Job
              </h3>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 ">
                <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Kode
                </label>
                <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {job_kode}
                </label>

                <div className="mb-4.5">
                  <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                    Preparate
                  </label>
                  <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                    {nama}
                  </label>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                    Customer
                  </label>
                  <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                    {perusahaan}
                  </label>
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                  Tanggal Kirim
                </label>

                <label className="ml-6 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                  {dateFormatID(tanggal_kirim)}
                </label>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                  Tanggal Pengumpulan
                </label>

                <label className="ml-6 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                  {dateFormatID(tanggal_pengumpulan)}
                </label>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-whit  flex text-center items-center gap-3">
                  Data Pendukung
                  <p className="font-normal italic text-sm text-[#b3b1b1]">
                    || Tekan icon untuk download.
                  </p>
                </label>

                <Data data={data_pendukung} />

                <div className="mb-6">
                  <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
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
                        color="#6456FE"
                      ></l-dot-stream>
                    </div>
                  ) : (
                    <div className="flex justify-center w-full gap-7">
                      <ButtonNegative text="Cancel" Click={handleClose} />
                      <ButtonPositive text="Take" Click={handleTakeJob} />
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

export default TakeJob;
