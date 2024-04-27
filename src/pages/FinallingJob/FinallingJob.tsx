import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import Swal from 'sweetalert2';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFinallingJob } from '../../Helpers/API/Job/CS/FinallingJob';
import ViewResponseJob from './ViewResponseJob';
import ResponseJob from './ResponseJob';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';

const FinallingJob = () => {
  const [getDataJobAssignment, setDataJobAssignment] = useState<
    JobAssignment[] | null
  >(null);
  const [openResponse, setOpenResponse] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [designer, setDesigner] = useState('');
  const [hasil_design, setHasilDesign] = useState('');
  const [job_kode, setKode] = useState('');
  const [statusTanggapan, setStatusTanggapan] = useState(0);
  const token = localStorage.getItem('token');

  const handleOpen = (open: number) => {
    open === 1 ? setOpenResponse(true) : setOpenView(true);
  };
  const handleOpenView = (
    kode: string,
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
    setNama(nama);
    setPerusahaan(perusahaan);
    setTanggalKirim(tanggal_kirim);
    setTanggalPengumpulan(tanggal_pengumpulan);
    setDesigner(designer);
    setHasilDesign(hasil_design);
    setStatusTanggapan(status_tanggapan);
    console.log(statusTanggapan);
  };

  const handleClose = (open: number) => {
    open === 1 ? setOpenResponse(false) : setOpenView(false);
    handlerGetData();
  };

  const handlerGetData = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getFinallingJob(token);
      setDataJobAssignment(data.data);
      console.log(data.data);
    } catch (err) {
      if (err instanceof Error) {
        // console.log(err);
        notify(err.message, 'error');
        Swal.fire({
          icon: 'error',
          title: 'Ambil Data',
          text: err.message,
          confirmButtonText: 'Ok',
        }).then((res) => {});
      }
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Penyelesaian Pekerjaan" />

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
                      Designer
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDataJobAssignment != null &&
                  getDataJobAssignment.length > 0 ? (
                    getDataJobAssignment?.map((jobAssignment, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {jobAssignment.job.nama}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobAssignment.job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat(jobAssignment.job.tanggal_kirim,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobAssignment.designer.nama}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
                                onClick={() =>
                                  jobAssignment.job.tanggapan_customer ==
                                    null ||
                                  jobAssignment.job.tanggapan_customer == 0
                                    ? handleOpenView(
                                        jobAssignment.kode,
                                        jobAssignment.job.nama,
                                        jobAssignment.job.perusahaan,
                                        jobAssignment.tanggal_pengumpulan,
                                        jobAssignment.job.tanggal_kirim,
                                        jobAssignment.designer.nama,
                                        jobAssignment.job.hasil_design,
                                        jobAssignment.job.tanggapan_customer,
                                        1,
                                      )
                                    : handleOpenView(
                                        jobAssignment.kode,
                                        jobAssignment.job.nama,
                                        jobAssignment.job.perusahaan,
                                        jobAssignment.tanggal_pengumpulan,
                                        jobAssignment.job.tanggal_kirim,
                                        jobAssignment.designer.nama,
                                        jobAssignment.job.hasil_design,
                                        jobAssignment.job.tanggapan_customer,
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
          <ResponseJob
            onClose={() => handleClose(1)}
            open={openResponse}
            job_kode={job_kode}
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
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            designer={designer}
            hasil_design={hasil_design}
            status={statusTanggapan}
          />
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default FinallingJob;
