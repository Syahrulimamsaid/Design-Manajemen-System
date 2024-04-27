import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import Swal from 'sweetalert2';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFinallingJob } from '../../Helpers/API/Job/CS/FinallingJob';
import ViewResponseJob from '../FinallingJob/ViewResponseJob';
import ResponseJob from '../FinallingJob/ResponseJob';
import { getJob } from '../../Helpers/API/Job/Designer/TakeJob';
import GetJob from './GetJobDialog';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';

const TakeJob = () => {
  const [getDataJobMe, setDataJobMe] = useState<JobAssignment[] | null>(null);

  const [openView, setOpenView] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [job_kode, setKode] = useState('');
  const [catatan, setCatatan] = useState('');
  const [data_pendukung, setDataPendukung] = useState<DataPendukung[] | null>(
    null,
  );
  const token = localStorage.getItem('token');

  const handleOpen = () => {
    setOpenView(true);
  };
  const handleOpenView = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_pengumpulan: string,
    tanggal_kirim: string,
    data_pendukung: any,
    catatan: string,
  ) => {
    setOpenView(true);
    setKode(kode);
    setNama(nama);
    setPerusahaan(perusahaan);
    setTanggalKirim(tanggal_kirim);
    setTanggalPengumpulan(tanggal_pengumpulan);
    setDataPendukung(data_pendukung);
    setCatatan(catatan);
  };

  const handleClose = () => {
    setOpenView(false);
    handlerGetData();
  };

  const handlerGetData = async () => {
    try {
      const jobMe = await getJob(token);
      setDataJobMe(jobMe.data);
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
        <Breadcrumb pageName="Ambil Pekerjaan" />

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
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDataJobMe != null && getDataJobMe.length > 0 ? (
                    getDataJobMe?.map((jobMe, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {jobMe.job.nama}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobMe.job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat(jobMe.job.tanggal_kirim,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat(jobMe.tanggal_pengumpulan,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
                                onClick={() =>
                                  handleOpenView(
                                    jobMe.kode,
                                    jobMe.job.nama,
                                    jobMe.job.perusahaan,
                                    jobMe.tanggal_pengumpulan,
                                    jobMe.job.tanggal_kirim,
                                    jobMe.job.data_pendukung,
                                    jobMe.job.catatan,
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
          <GetJob
            onClose={handleClose}
            open={openView}
            kode={job_kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            data_pendukung={data_pendukung}
            catatan={catatan}
          />
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default TakeJob;
