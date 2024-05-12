import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import {
  getJobRejected,
  getRevision,
} from '../../Helpers/API/Job/Koor/JobRevisionAPI';
import RevisionDialog from './JobRevisionScheduledDialog';
import dateFormat from 'dateformat';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import { Tooltip } from '@mui/material';
import LoaderTable from '../../layout/LoaderTable/Loader';

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
  const [job_kode, setJobKode] = useState('');
  const [kode, setKode] = useState('');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const handleOpenView = (
    kode?: string,
    job_kode?: string,
    nama?: string,
    perusahaan?: string,
    tanggal_kirim?: string,
    designer?: string,
    komentar?: string,
    status?: number,
  ) => {
    setKode(kode!);
    setJobKode(job_kode!);
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
    setLoading(true);
    try {
      const dataRevision = await getRevision(token);
      const dataRejected = await getJobRejected(token);

      setDataRevision(dataRevision.data);
      setDataRejected(dataRejected.data);
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
        <Breadcrumb pageName="Job Revision" />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col h-screen">
            <div className="">
              <div className="h-full pb-5">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
                  <p className="font-bold font-poppins text-md text-slate-800 mb-5 ">
                    Tidak Lolos Quality Control{' '}
                  </p>
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
                            Tanggal Pengumpulan
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                            Designer
                          </th>
                          <th className="py-4 px-4 font-medium text-[#201650] dark:text-white"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={6} className="text-center">
                              <LoaderTable />
                            </td>
                          </tr>
                        ) : getDataRevision && getDataRevision.length > 0 ? (
                          getDataRevision.map((checkRevision, index) => (
                            <tr key={index}>
                              <td className=" border-b border-[#eee] bg-[#fff2f2] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-[#201650] dark:text-white">
                                  {checkRevision.job_assignment.job.kode}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {checkRevision.job_assignment.job.nama}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {checkRevision.job_assignment.job.perusahaan}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {dateFormatID(
                                    checkRevision.job_assignment.job
                                      .tanggal_kirim,
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {dateFormatID(
                                    checkRevision.job_assignment
                                      .tanggal_pengumpulan,
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {checkRevision.job_assignment.user.nama}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <Tooltip
                                    title="Plot"
                                    children={
                                      <button className="text-[#5537f4] hover:text-slate-900 m-0.5">
                                        <SlArrowRightCircle
                                          size={22}
                                          strokeWidth={25}
                                          onClick={() =>
                                            handleOpenView(
                                              checkRevision.job_assignment.kode,
                                              checkRevision.job_assignment.job
                                                .kode,
                                              checkRevision.job_assignment.job
                                                .nama,
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
              <div className="h-full">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-full">
                  <p className="font-bold font-poppins text-md text-slate-800 mb-5">
                    Ditolak Customer{' '}
                  </p>
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-[#c2c9ff] text-left dark:bg-meta-4">
                          <th className="min-w-[220px] py-4 px-4 font-medium text-[#201650] dark:text-white xl:pl-11">
                            Kode
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                            Praparate
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                            Customer
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                            Tanggal Kirim
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                            Tanggal Pengumpulan
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                            Designer
                          </th>
                          <th className="py-4 px-4 font-medium text-[#201650] dark:text-white"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={6} className="text-center">
                              <LoaderTable />
                            </td>
                          </tr>
                        ) : getDataRejected && getDataRejected.length > 0 ? (
                          getDataRejected.map((jobRejected, index) => (
                            <tr key={index}>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-[#201650] dark:text-white">
                                  {jobRejected.job.kode}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {jobRejected.job.nama}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {jobRejected.job.perusahaan}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {dateFormatID(jobRejected.job.tanggal_kirim)}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {dateFormatID(
                                    jobRejected.tanggal_pengumpulan,
                                  )}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <p className="text-[#201650] dark:text-white">
                                  {jobRejected.designer.nama}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] bg-[#fff2f2] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <Tooltip
                                    title="Plot"
                                    children={
                                      <button className="text-[#5537f4] hover:text-slate-900 m-0.5">
                                        <SlArrowRightCircle
                                          size={22}
                                          strokeWidth={25}
                                          onClick={() =>
                                            handleOpenView(
                                              jobRejected.kode,
                                              jobRejected.job.kode,
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
            </div>
          </div>
          <RevisionDialog
            onClose={handleClose}
            open={open}
            kode={kode}
            job_kode={job_kode}
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
