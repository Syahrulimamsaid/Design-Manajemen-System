import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import { getJobAssignment } from '../../Helpers/API/Job/Koor/JobAssignment';
import AssignmentDialog from './AssignmentDialog';
import dateFormat from 'dateformat';

const JobAssignment = () => {
  const [getDataJobAssignment, setDataJobAssignment] = useState<Job[] | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [kode, setKode] = useState('');
  const [status_data, setStatusData] = useState('');
  const token = localStorage.getItem('token');

  const handleOpen = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_kirim: string,
    status_data: string,
  ) => {
    setOpen(true);
    setKode(kode!);
    setNama(nama!);
    setPerusahaan(perusahaan!);
    setTanggalKirim(tanggal_kirim!);
    setStatusData(status_data!);
  };

  const handleClose = () => {
    setOpen(false);
    handlerGetData();
  };

  const handlerGetData = async () => {
    try {
      const data = await getJobAssignment(token);
      setDataJobAssignment(data.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Posting Pekerjaan" />

        <div className="flex flex-col gap-10">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Nama
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Perusahaan
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Tanggal Kirim
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Status Data
                    </th>

                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDataJobAssignment != null && getDataJobAssignment.length>0 ? (
                    getDataJobAssignment?.map((job, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {job.nama}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat(job.tanggal_kirim,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              job.status_data === '1'
                                ? 'bg-primary text-primary'
                                : 'bg-warning text-warning'
                            }`}
                          >
                            {job.status_data === '1'
                              ? 'Lengkap'
                              : 'Belum Lengkap'}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              {job.status_data == '1' ? (
                                <SlArrowRightCircle
                                  size={20}
                                  onClick={() =>
                                    handleOpen(
                                      job.kode,
                                      job.nama,
                                      job.perusahaan,
                                      job.tanggal_kirim,
                                      job.status_data,
                                    )
                                  }
                                />
                              ) : (
                                ''
                              )}
                            </button>
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
        onClose={handleClose}
        kode={kode}
        nama={nama}
        perusahaan={perusahaan}
        tanggal_kirim={tanggalKirim}
        status={status_data}
      />
    </>
  );
};

export default JobAssignment;
