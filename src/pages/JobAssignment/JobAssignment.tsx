import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle, SlEye } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import { getJobAssignment } from '../../Helpers/API/Job/Koor/JobAssignment';
import AssignmentDialog from './AssignmentDialog';
import dateFormat from 'dateformat';
import { getStatusClass, getStatusText } from '../../Helpers/Status/Status';
import AssignmentView from './AssignmentView';
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import { Tooltip } from '@mui/material';
import LoaderTable from '../../layout/LoaderTable/Loader';
const JobAssignment = () => {
  const [getDataJobAssignment, setDataJobAssignment] = useState<Job[] | null>(
    null,
  );

  // const idLocale = {
  //   formatLong: {
  //     date: 'd MMMM yyyy', // Format tanggal: "1 Januari 2024"
  //     time: 'HH:mm:ss', // Format waktu: "23:59:59"
  //     dateTime: 'd MMMM yyyy HH:mm:ss' // Format tanggal dan waktu: "1 Januari 2024 23:59:59"
  //   },
  //   months: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'], // Daftar nama bulan dalam Bahasa Indonesia
  //   monthsShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'], // Daftar nama bulan singkat dalam Bahasa Indonesia
  //   weekdays: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'], // Daftar nama hari dalam Bahasa Indonesia
  //   weekdaysShort: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'], // Daftar nama hari singkat dalam Bahasa Indonesia
  //   weekdaysMin: [] // Daftar nama hari minimal dalam Bahasa Indonesia

  // };
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [kode, setKode] = useState('');
  const [status_data, setStatusData] = useState('');
  const [tanggapanCustomer, setTanggapan] = useState(0);
  const [designer, setDesigner] = useState('');
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  const handleOpen = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_kirim: string,
    status_data: string,
    number: number,
    tanggapan_customer?: number,
    tanggal_pengumpulan?: string,
    designer?: string,
  ) => {
    number == 1 ? setOpen(true) : setOpenView(true);
    setKode(kode!);
    setNama(nama!);
    setPerusahaan(perusahaan!);
    setTanggalKirim(tanggal_kirim!);
    setStatusData(status_data!);
    setDesigner(designer!);
    setTanggapan(tanggapan_customer!);
    setTanggalPengumpulan(tanggal_pengumpulan!);
  };

  const handleClose = (number: number) => {
    number == 1 ? setOpen(false) : setOpenView(false);
    handlerGetData();
  };

  const handlerGetData = async () => {
    setLoading(true);
    try {
      const data = await getJobAssignment(token);
      setDataJobAssignment(data.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Job Plotting" />

        <div className="flex flex-col gap-10">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-[#c2c9ff] text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-[#201650] dark:text-white xl:pl-11">
                      Kode
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                      Preparate
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                      Customer
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                      Tanggal Kirim
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                      Data Pendukung
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                      Status
                    </th>

                    <th className="py-4 px-4 font-medium text-[#201650] dark:text-white"></th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className='text-center'>
                        <LoaderTable />
                      </td>
                    </tr>
                  ) : getDataJobAssignment != null &&
                    getDataJobAssignment.length > 0 ? (
                    getDataJobAssignment?.map((job, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-[#201650] dark:text-white">
                            {job.kode}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {job.nama}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {dateFormatID(job.tanggal_kirim)}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              job.status_data === '1'
                                ? 'bg-[#10c735] text-[#10c735]'
                                : 'bg-danger text-danger'
                            }`}
                          >
                            {job.status_data === '1'
                              ? 'Lengkap'
                              : 'Belum Lengkap'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${getStatusClass(
                              job.status,
                              job.tanggapan_customer,
                            )}`}
                          >
                            {getStatusText(job.status, job.tanggapan_customer)}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Tooltip
                              title="view"
                              children={
                                <button
                                  className={` m-0.5 ${
                                    job.status === '2' || job.status === '5'
                                      ? `text-[#5537f4] hover:text-slate-900`
                                      : ''
                                  }`}
                                >
                                  <SlEye
                                    size={22}
                                    strokeWidth={25}
                                    onClick={() =>
                                      job.status === '2' || job.status === '5'
                                        ? handleOpen(
                                            job.kode,
                                            job.nama,
                                            job.perusahaan,
                                            job.tanggal_kirim,
                                            job.status,
                                            2,
                                            job.tanggapan_customer,
                                            job.tanggal_pengumpulan,
                                            job.designer,
                                          )
                                        : ''
                                    }
                                  />
                                </button>
                              }
                            />

                            <Tooltip
                              title="Plot"
                              children={
                                <button
                                  className={`m-0.5 ${
                                    job.status_data == '1'
                                      ? job.status === '1'
                                        ? `text-[#5537f4] hover:text-slate-900`
                                        : ''
                                      : ''
                                  }`}
                                >
                                  <SlArrowRightCircle
                                    size={20}
                                    strokeWidth={25}
                                    onClick={() =>
                                      job.status_data == '1'
                                        ? job.status === '1'
                                          ? handleOpen(
                                              job.kode,
                                              job.nama,
                                              job.perusahaan,
                                              job.tanggal_kirim,
                                              job.status_data,
                                              1,
                                              job.tanggapan_customer,
                                              job.tanggal_pengumpulan,
                                              job.designer,
                                            )
                                          : ''
                                        : ''
                                    }
                                  />
                                </button>
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-5 px-4 text-center dark:border-strokedark"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
      <AssignmentDialog
        open={open}
        onClose={() => handleClose(1)}
        kode={kode}
        nama={nama}
        perusahaan={perusahaan}
        tanggal_kirim={tanggalKirim}
        status={status_data}
      />
      <AssignmentView
        open={openView}
        onClose={() => handleClose(2)}
        kode={kode}
        nama={nama}
        perusahaan={perusahaan}
        tanggal_kirim={tanggalKirim}
        status={status_data}
        tanggapan_customer={tanggapanCustomer}
        tanggal_pengumpulan={tanggal_pengumpulan}
        designer={designer}
      />
    </>
  );
};

export default JobAssignment;
