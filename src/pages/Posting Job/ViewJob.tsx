import { Link, useNavigate } from 'react-router-dom';
import flatpickr from 'flatpickr';
import { useEffect, useRef, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import { postJob } from '../../Helpers/API/Job/CS/PostingJobAPI';
import { dotStream } from 'ldrs';
import { getDataView } from '../../Helpers/API/Data/DataAPI';
import dateFormat from 'dateformat';
import Data from '../../layout/Data/GetData';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import ButtonPositive from '../../layout/Button/ButtonPositive';

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

function ViewJob(props: SimpleDialogProps) {
  const {
    onClose,
    open,
    kode,
    nama,
    perusahaan,
    tanggal_kirim,
    catatan,
    data_pendukung,
  } = props;

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose('');
  };

  useEffect(() => {
    // setSelectedFiles(data_pendukung);
  });

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
            <div className="border-b border-[#342689] py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                View Job
              </h3>
            </div>
            <div className="p-10.5">
              <div className="mb-4.5 ">
                <label className="mb-4.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Kode
                </label>
                <label className="ml-5 mb-4.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {kode}
                </label>
                <label className="mb-4.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Preparate
                </label>
                <label className="ml-5 mb-4.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {nama}
                </label>
                <label className="mb-4.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Customer
                </label>
                <label className="ml-5 mb-4.5 block font-poppins font-medium text-slate-600 dark:text-white">
                  {perusahaan}
                </label>
                <label className="mb-4.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                  Tanggal Kirim
                </label>

                <label className="ml-6 mb-4.5 block font-poppins font-medium text-slate-600 dark:text-white">
                  {dateFormatID(tanggal_kirim)}
                </label>

                <div className="mb-4.5">
                  <label className="mb-4.5 block text-[#201650] font-poppins font-semibold dark:text-white flex gap-3 items-center">
                    Data Pendukung
                    <p className="font-normal italic text-sm text-[#b3b1b1]">
                          || Tekan icon untuk download.
                        </p>
                  </label>

                  <Data data={data_pendukung} />
                </div>
                <label className="mb-4.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                  Catatan
                </label>
                <label
                  className="ml-6 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {catatan === null ? 'Catatan tidak ada' : catatan}
                </label>
              </div>
              <div className="mt-20 items-right flex justify-end">
                <ButtonPositive text="Close" Click={handleClose} />
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </Dialog>
    // </DefaultLayout>
  );
}

export default ViewJob;
