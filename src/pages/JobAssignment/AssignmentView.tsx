import { useEffect, useState } from 'react';
import { Dialog, Tooltip } from '@mui/material';
import React from 'react';
import DatePicker from '../../components/Forms/DatePicker/DatePicker';
import { notify } from '../../Helpers/Notify/Notify';
import { getDesigner } from '../../Helpers/API/Designer/Designer';
import { jobShceduled } from '../../Helpers/API/Job/Koor/JobAssignment';
import { dotStream } from 'ldrs';
import { convertStringToDate } from '../../Helpers/Date/ConvertDate';
import dateFormat from 'dateformat';
import { getStatusClass, getStatusText } from '../../Helpers/Status/Status';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import ButtonNegative from '../../layout/Button/ButtonNegative';
import ButtonPositive from '../../layout/Button/ButtonPositive';

export interface AssignmentViewProps {
  open: boolean;
  onClose: (value: string) => void;
  kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  status: string;
  tanggapan_customer:number;
  tanggal_pengumpulan: string;
  designer: string;
}

function AssignmentView(props: AssignmentViewProps) {
  const {
    onClose,
    open,
    nama,
    kode,
    perusahaan,
    tanggal_kirim,
    tanggal_pengumpulan,
    status,
    tanggapan_customer,
    designer,
  } = props;

  dotStream.register();

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    onClose('');
  };

  useEffect(() => {
    if (open) {
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="sm">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
            <div className="border-b border-[#7776ff] py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                View Job Plotting
              </h3>
            </div>
            <div className="p-8">
              <div className="mb-4.5">
                <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Kode
                </label>
                <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {kode}
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
                <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Tanggal Kirim
                </label>
                <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {dateFormatID(tanggal_kirim)}
                </label>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Tanggal Pengumpulan
                </label>
                <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {dateFormatID(tanggal_pengumpulan)}
                </label>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-[#201650]  font-poppins font-semibold dark:text-white">
                  Status
                </label>
                <p
                  className={`ml-5 mb-2.5 inline-flex rounded-full bg-opacity-15 py-1 px-3 text-sm font-bold ${getStatusClass(
                    status,tanggapan_customer
                  )}`}
                >
                  {getStatusText(status,tanggapan_customer)}
                </p>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block font-poppins font-semibold text-[#201650] dark:text-white">
                  Designer
                </label>
                <label className="ml-5 mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white min-w-96">
                  {designer}
                </label>
              </div>
              <div className="mt-20 items-center flex justify-center">
                <ButtonPositive text="Close" Click={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
    // </DefaultLayout>
  );
}

export default AssignmentView;
