import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlEye } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFinallingJob } from '../../Helpers/API/Job/CS/FinallingJob';
import ViewResponseJob from './ViewResponseJob';
import ResponseJob from './ResponseJob';
import { notify } from '../../Helpers/Notify/Notify';
import RejectedJob from './RejectedJob';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import { SlCheck } from 'react-icons/sl';
import { Tooltip } from '@mui/material';
import LoaderTable from '../../layout/LoaderTable/Loader';

const FinallingJob = () => {
  const [getDataJobAssignment, setDataJobAssignment] = useState<
    JobAssignment[] | null
  >(null);
  const [openResponse, setOpenResponse] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openRejected, setOpenRejected] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [designer, setDesigner] = useState('');
  const [hasil_design, setHasilDesign] = useState('');
  const [kode, setKode] = useState('');
  const [job_kode, setJobKode] = useState('');
  const [statusTanggapan, setStatusTanggapan] = useState(0);
  const token = localStorage.getItem('token');
  const[loading,setLoading]=useState(false);

  const handleOpenView = (
    kode: string,
    job_kode: string,

    nama: string,
    perusahaan: string,
    tanggal_pengumpulan: string,
    tanggal_kirim: string,
    designer: string,
    hasil_design: any,
    status_tanggapan: number,
    open: number,
  ) => {
    open === 1 ? setOpenResponse(true) : setOpenView(true);
    setKode(kode);
    setJobKode(job_kode);
    setNama(nama);
    setPerusahaan(perusahaan);
    setTanggalKirim(tanggal_kirim);
    setTanggalPengumpulan(tanggal_pengumpulan);
    setDesigner(designer);
    setHasilDesign(hasil_design);
    setStatusTanggapan(status_tanggapan);
  };

  const handleClose = (open: number) => {
    open === 3 ? setOpenResponse(false) : '';

    if (open === 0) {
      setOpenResponse(false);
      setOpenRejected(false);
      setOpenView(false);
    }

    open === 1
      ? setOpenResponse(false)
      : open === 2
      ? setOpenView(false)
      : open === 3
      ? setOpenRejected(true)
      : '';

    handlerGetData();
  };

  const handlerGetData = async () => {
    setLoading(true);
    try {
      const data = await getFinallingJob(token);
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
        <Breadcrumb pageName="Job Finalling" />

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
                      Designer
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
                  ) :getDataJobAssignment != null &&
                  getDataJobAssignment.length > 0 ? (
                    getDataJobAssignment?.map((jobAssignment, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-[#201650] dark:text-white">
                            {jobAssignment.job.kode}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {jobAssignment.job.nama}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {jobAssignment.job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {dateFormatID(jobAssignment.job.tanggal_kirim)}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-[#201650] dark:text-white">
                            {jobAssignment.designer.nama}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              jobAssignment.job.tanggapan_customer == 1
                                ? 'bg-danger text-danger'
                                : jobAssignment.job.tanggapan_customer == 2
                                ? 'bg-success text-success'
                                : jobAssignment.job.tanggapan_customer ==
                                    null ||
                                  jobAssignment.job.tanggapan_customer == 0
                                ? 'bg-primary text-primary'
                                : 'bg-waning text-waning'
                            }`}
                          >
                            {jobAssignment.job.tanggapan_customer == 1
                              ? 'Ditolak'
                              : jobAssignment.job.tanggapan_customer == 2
                              ? 'Diterima'
                              : jobAssignment.job.tanggapan_customer == null ||
                                jobAssignment.job.tanggapan_customer == 0
                              ? 'Belum Ditanggapi'
                              : 'Tidak Terdefinisi'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-4">
                            <Tooltip
                              title="View"
                              children={
                                <button
                                  className= {` m-0.5  ${
                                    jobAssignment.job.tanggapan_customer.toString() !==
                                    '0'
                                      ? `text-[#5537f4] hover:text-slate-900`
                                      : ''
                                  }`}
                                >
                                  <SlEye
                                    size={22}
                                    strokeWidth={25}
                                    onClick={() =>
                                      jobAssignment.job.tanggapan_customer.toString() !==
                                      '0'
                                        ? handleOpenView(
                                            jobAssignment.kode,
                                            jobAssignment.job.kode,

                                            jobAssignment.job.nama,
                                            jobAssignment.job.perusahaan,
                                            jobAssignment.tanggal_pengumpulan,
                                            jobAssignment.job.tanggal_kirim,
                                            jobAssignment.designer.nama,
                                            jobAssignment.job.hasil_design,
                                            jobAssignment.job
                                              .tanggapan_customer,
                                            2,
                                          )
                                        : ''
                                    }
                                  />
                                </button>
                              }
                            ></Tooltip>

                            <Tooltip
                              title="Response"
                              children= {
                                <button
                                  className={` m-1 ${
                                    jobAssignment.job.tanggapan_customer ==
                                      null ||
                                    jobAssignment.job.tanggapan_customer.toString() ===
                                      '0'
                                      ? `text-[#5537f4] hover:text-slate-900`
                                      : ''
                                  }`}
                                >
                                  <SlCheck
                                    size={22}
                                    strokeWidth={25}
                                    onClick={() =>
                                      jobAssignment.job.tanggapan_customer ==
                                        null ||
                                      jobAssignment.job.tanggapan_customer.toString() ===
                                        '0'
                                        ? handleOpenView(
                                            jobAssignment.kode,
                                            jobAssignment.job.kode,

                                            jobAssignment.job.nama,
                                            jobAssignment.job.perusahaan,
                                            jobAssignment.tanggal_pengumpulan,
                                            jobAssignment.job.tanggal_kirim,
                                            jobAssignment.designer.nama,
                                            jobAssignment.job.hasil_design,
                                            jobAssignment.job
                                              .tanggapan_customer,
                                            1,
                                          )
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
          <ResponseJob
            onClose={handleClose}
            open={openResponse}
            job_kode={job_kode}
            kode={kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            designer={designer}
            hasil_design={hasil_design}
          />
          <ViewResponseJob
            open={openView}
            onClose={() => handleClose(2)}
            nama={nama}
            job_kode={job_kode}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            designer={designer}
            hasil_design={hasil_design}
            status={statusTanggapan}
          />
          <RejectedJob
            open={openRejected}
            onClose={handleClose}
            nama={nama}
            kode={kode}
            job_kode={job_kode}
            perusahaan={perusahaan}
            designer={designer}
            tanggal_kirim={tanggalKirim}
          />
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default FinallingJob;
