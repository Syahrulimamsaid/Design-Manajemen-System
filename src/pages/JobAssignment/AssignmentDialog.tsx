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

export interface AssignmentDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  kode: string;
  nama: string;
  perusahaan: string;
  tanggal_kirim: string;
  status: string;
}

function AssignmentDialog(props: AssignmentDialogProps) {
  const { onClose, open, nama, kode, perusahaan, tanggal_kirim, status } =
    props;

  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [selectedDesigner, setSelectedDesigner] = useState('');

  const [getDataDesigner, setDataDesigner] = useState<User[] | null>(null);

  dotStream.register();

  const handleClose = (event: React.FormEvent) => {
    event.preventDefault();
    handleEmpty();
    onClose('');
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

  const handleEmpty = () => {
    setTanggalPengumpulan('');
    setSelectedDesigner('');
  };

  const handleSelectedDate = (value: string) => {
    setTanggalPengumpulan(value);
  };

  const handleSetJobSchedulling = async () => {
    if (!tanggal_kirim || !selectedDesigner) {
      notify('Data belum lengkap', 'info');
    } else if (tanggal_kirim && selectedDesigner) {
      setLoading(true);
      try {
        await jobShceduled(token, kode, selectedDesigner, tanggal_pengumpulan);
        setLoading(false);
        notify('Penugasan berhasil', 'success');
        handleEmpty();
        onClose('');
      } catch (err) {
        if (err instanceof Error) {
          notify(err.message, 'error');
        }
        setLoading(false);
        handleEmpty();
        onClose('');
      }
    }
  };

  useEffect(() => {
    if (open) {
      handleGetDesigner();
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="md">
      <div className="sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pl-2 pr-2">
            <div className="border-b border-[#7776ff] py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold font-poppins text-[#201650] dark:text-white">
                Job Plotting
              </h3>
            </div>
            <div className="p-8">
              <form className="w-full">
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
                  <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                    Status
                  </label>
                  <p
                    className={`ml-5 mb-2.5 inline-flex rounded-full bg-opacity-15 py-1 px-3 text-sm font-bold ${getStatusClass(
                      status,
                    )}`}
                  >
                    {getStatusText(status)}
                  </p>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                    Tanggal Pengumpulan{' '}
                    <Tooltip
                      children={<span className="text-meta-1">*</span>}
                      title="Bidang kolom ini harus diisi."
                    ></Tooltip>
                  </label>

                  <DatePicker
                    onDateChange={handleSelectedDate}
                    // status={statusTanggalKirim}
                    dateSelected={tanggal_pengumpulan}
                    maxDate={new Date(tanggal_kirim)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-[#201650] font-poppins font-semibold dark:text-white">
                    Designer{' '}
                    <Tooltip
                      children={<span className="text-meta-1">*</span>}
                      title="Bidang kolom ini harus diisi."
                    ></Tooltip>
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={selectedDesigner}
                      onChange={(e) => {
                        setSelectedDesigner(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 font-normal outline-none transition focus:border-[#7776ff]  active:border-[#7776ff] hover:border-[#7776ff]  dark:border-form-strokedark dark:bg-form-input`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        Pilih Designer
                      </option>

                      {getDataDesigner?.map((designer, index) => (
                        <option
                          key={index}
                          value={designer.kode}
                          className="text-body dark:text-bodydark"
                        >
                          {designer.nama}
                        </option>
                      ))}
                    </select>

                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </form>
              <div className="mt-20 items-center flex justify-center">
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
                      text="Plot"
                      Click={handleSetJobSchedulling}
                    />
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

export default AssignmentDialog;
