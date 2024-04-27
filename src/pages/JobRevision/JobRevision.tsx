import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import {
  getJobRejected,
  getRevision,
} from '../../Helpers/API/Job/Koor/JobRevisionAPI';
import RevisionDialog from './JobRevisionScheduledDialog';
import dateFormat from 'dateformat';

const JobRevision = () => {
  const [getDataRevision, setDataRevision] = useState<QualityControl[] | null>(
    null,
  );
  const [getDataRejected, setDataRejected] = useState<JobAssignment[] | null>(
    null,
  );

  const [open, setOpen] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [designer, setDesigner] = useState('');
  const [tanggal_kirim, setTanggalKirim] = useState('');
  const [komentar, setKomenter] = useState('');
  const [status, setStatus] = useState(0);
  const [job_kode, setKode] = useState('');
  const token = localStorage.getItem('token');

  const handleOpenView = (
    kode?: string,
    nama?: string,
    perusahaan?: string,
    tanggal_kirim?: string,
    designer?: string,
    komentar?: string,
    status?: number,
  ) => {
    setKode(kode!);
    setNama(nama!);
    setPerusahaan(perusahaan!);
    setTanggalKirim(tanggal_kirim!);
    setDesigner(designer!);
    setKomenter(komentar!);
    setStatus(status!);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handlerGetData();
  };

  const handlerGetData = async () => {
    try {
      const dataRevision = await getRevision(token);
      const dataRejected = await getJobRejected(token);

      setDataRevision(dataRevision.data);
      setDataRejected(dataRejected.data);
      console.log(dataRejected.data);
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
        <Breadcrumb pageName="Revisi Pekerjaan" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col h-screen">
            <div className="">
              <div className="h-full pb-5">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
                  <p className="font-bold font-poppins text-md text-slate-800 mb-5 text-right">
                    Tidak Lolos Quality Control{' '}
                  </p>
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
                            Tanggal Pengumpulan
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Designer
                          </th>
                          <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Tindakan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDataRevision && getDataRevision.length > 0 ? (
                          getDataRevision.map((checkRevision, index) => (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {checkRevision.job_assignment.job.nama}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {checkRevision.job_assignment.job.perusahaan}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {dateFormat(
                                    checkRevision.job_assignment.job
                                      .tanggal_kirim,
                                    'dddd, dd mmmm yyyy',
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {dateFormat(
                                    checkRevision.job_assignment
                                      .tanggal_pengumpulan,
                                    'dddd, dd mmmm yyyy',
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {checkRevision.job_assignment.user.nama}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <button className="hover:text-success">
                                    <SlArrowRightCircle
                                      size={20}
                                      onClick={() =>
                                        handleOpenView(
                                          checkRevision.job_assignment.kode,
                                          checkRevision.job_assignment.job.nama,
                                          checkRevision.job_assignment.job
                                            .perusahaan,
                                          checkRevision.job_assignment.job
                                            .tanggal_kirim,
                                          checkRevision.job_assignment.user
                                            .nama,
                                          checkRevision.komentar,
                                          1,
                                        )
                                      }
                                    />
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
              <div className="h-full">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
                  <p className="font-bold font-poppins text-md text-slate-800 mb-5 text-right">
                    Ditolak Customer{' '}
                  </p>
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
                            Tanggal Pengumpulan
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Designer
                          </th>
                          <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Tindakan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getDataRejected && getDataRejected.length > 0 ? (
                          getDataRejected.map((jobRejected, index) => (
                            <tr key={index}>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {jobRejected.job.nama}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {jobRejected.job.perusahaan}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {dateFormat(
                                    jobRejected.job.tanggal_kirim,
                                    'dddd, dd mmmm yyyy',
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {dateFormat(
                                    jobRejected.tanggal_pengumpulan,
                                    'dddd, dd mmmm yyyy',
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {jobRejected.designer.nama}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <button className="hover:text-success">
                                    <SlArrowRightCircle
                                      size={20}
                                      onClick={() =>
                                        handleOpenView(
                                          jobRejected.kode,
                                          jobRejected.job.nama,
                                          jobRejected.job.perusahaan,
                                          jobRejected.job.tanggal_kirim,
                                          jobRejected.designer.nama,
                                          '',
                                          2,
                                        )
                                      }
                                    />
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
            </div>
          </div>
          <RevisionDialog
            onClose={handleClose}
            open={open}
            kode={job_kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggal_kirim}
            designer={designer}
            komentar={komentar}
            status={status}
          />
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default JobRevision;
