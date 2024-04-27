import {  useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCheck } from '../../Helpers/API/Job/QC/CheckJob';
import ResponseCheck from './ResponseCheck';
import { notify } from '../../Helpers/Notify/Notify';
import CancelJob from './CancelJob';
import dateFormat from 'dateformat';

const CheckedJob = () => {
  const [getDataJobCheck, setDataCheckJob] = useState<JobAssignment[] | null>(
    null,
  );
  const [getDataJobCheckKoor, setDataCheckJobKoor] = useState<
    QualityControl[] | null
  >(null);
  const [open, setOpen] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [designer, setDesigner] = useState('');
  const [hasil_design, setHasilDesign] = useState('');
  const [catatan, setCatatan] = useState('');
  const [data_pendukung, setDataPendukung] = useState<DataPendukung[] | null>(
    null,
  );
  const [job_kode, setKode] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleOpenView = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_pengumpulan: string,
    tanggal_kirim: string,
    designer: string,
    catatan: string,
    hasil_design: string,
    data_pendukung: any,
  ) => {
    setKode(kode);
    setNama(nama);
    setPerusahaan(perusahaan);
    setTanggalKirim(tanggal_kirim);
    setTanggalPengumpulan(tanggal_pengumpulan);
    setDesigner(designer);
    setCatatan(catatan);
    setHasilDesign(hasil_design);
    setDataPendukung(data_pendukung);
    setOpen(true);
    console.log(hasil_design);
  };

  const handleClose = (value: number) => {
    setOpen(false);
    handlerGetData();
    value === 1 ? setOpenCancel(true) : setOpenCancel(false);
  };

  const handlerGetData = async () => {
    try {
      const data = await getCheck(token);
      role == '1' ? setDataCheckJobKoor(data.data) : setDataCheckJob(data.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  const formattedDate = (tanggal: string) => {
    const date = new Date(tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return date;
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Pemeriksaan Pekerjaan" />

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
                  {role == '1' ? (
                    getDataJobCheckKoor && getDataJobCheckKoor.length > 0 ? (
                      getDataJobCheckKoor
                        .filter((checkJob) => checkJob.status == 0)
                        .map((checkJob, index) => (
                          <tr key={index}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {checkJob.job_assignment.job.nama}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {checkJob.job_assignment.job.perusahaan}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dateFormat( checkJob.job_assignment.job.tanggal_kirim,'dddd, dd mmmm yyyy')}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {dateFormat(checkJob.job_assignment.tanggal_pengumpulan,'dddd, dd mmmm yyyy')}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {checkJob.job_assignment.user.nama}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <div className="flex items-center space-x-3.5">
                                <button className="hover:text-success">
                                  <SlArrowRightCircle
                                    size={20}
                                    onClick={() =>
                                      handleOpenView(
                                        checkJob.job_assignment.kode,
                                        checkJob.job_assignment.job.nama,
                                        checkJob.job_assignment.job.perusahaan,
                                        checkJob.job_assignment
                                          .tanggal_pengumpulan,
                                        checkJob.job_assignment.job
                                          .tanggal_kirim,
                                        checkJob.job_assignment.user.nama,
                                        checkJob.job_assignment.job.catatan,
                                        checkJob.job_assignment.job
                                          .hasil_design,
                                        checkJob.job_assignment.job
                                          .data_pendukung,
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
                    )
                  ) : getDataJobCheck && getDataJobCheck.length > 0 ? (
                    getDataJobCheck?.map((checkJob, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {checkJob.job.nama}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {checkJob.job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat(checkJob.job.tanggal_kirim,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat(checkJob.tanggal_pengumpulan,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {checkJob.designer.nama}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
                                onClick={() =>
                                  handleOpenView(
                                    checkJob.kode,
                                    checkJob.job.nama,
                                    checkJob.job.perusahaan,
                                    checkJob.tanggal_pengumpulan,
                                    checkJob.job.tanggal_kirim,
                                    checkJob.designer.nama,
                                    checkJob.job.catatan,
                                    checkJob.job.hasil_design,
                                    checkJob.job.data_pendukung,
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
          <ResponseCheck
            onClose={handleClose}
            open={open}
            job_kode={job_kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            designer={designer}
            catatan={catatan}
            hasil_design={hasil_design}
            data_pendukung={data_pendukung}
          />
          <CancelJob
            onClose={handleClose}
            open={openCancel}
            job_kode={job_kode}
            nama={nama}
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

export default CheckedJob;
