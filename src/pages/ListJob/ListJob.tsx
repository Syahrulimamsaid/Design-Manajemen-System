import { SetStateAction, useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GetJob from '../TakeJob/GetJobDialog';
import { notify } from '../../Helpers/Notify/Notify';
import { getAllJob } from '../../Helpers/API/Job/Designer/ListJob';
import ViewJobMe from './ViewJobMe';
import SendJob from './SendJobMe';
import RevisionJob from './RevisionJobMe';
import {
  getStatusClass,
  getStatusText,
} from '../../Helpers/Status/Status';
import dateFormat, { masks } from "dateformat";

const ListJob = () => {
  const [getDataAllJob, setDataAllJob] = useState<JobAssignment[] | null>(null);

  const [openView, setOpenView] = React.useState(false);
  const [openSend, setOpenSend] = React.useState(false);
  const [openRevision, setOpenRevision] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [tanggal_pengumpulan, setTanggalPengumpulan] = useState('');
  const [job_kode, setKode] = useState('');
  const [catatan, setCatatan] = useState('');
  const [status, setStatus] = useState('');
  const [hasil_design, setHasilDesign] = useState('');
  const [komentar, setKomenter] = useState('');
  const [data_pendukung, setDataPendukung] = useState<DataPendukung[] | null>(
    null,
  );
  const token = localStorage.getItem('token');

  const handleOpenView = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_kirim: string,
    tanggal_pengumpulan: string,
    status: string,
    data_pendukung: any,
    catatan: string,
    hasil_design: string | null,
    komentar: any,
    number: number,
  ) => {
    number === 1
      ? setOpenView(true)
      : number === 2
      ? setOpenSend(true)
      : number === 3
      ? setOpenRevision(true)
      : '';
    setKode(kode);
    setNama(nama);
    setPerusahaan(perusahaan);
    setTanggalKirim(tanggal_kirim);
    setTanggalPengumpulan(tanggal_pengumpulan);
    setStatus(status);
    setDataPendukung(data_pendukung);
    setCatatan(catatan);
    setHasilDesign(hasil_design!);
    setKomenter(komentar!.komentar);
  };

  const handleClose = (number: number) => {
    number === 1
      ? setOpenView(false)
      : number === 2
      ? setOpenSend(false)
      : number === 3
      ? setOpenRevision(false)
      : '';
    handlerGetData();
  };

  const handlerGetData = async () => {
    try {
      const allJobMe = await getAllJob(token);
      setDataAllJob(allJobMe.data);
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
        <Breadcrumb pageName="Daftar Pekerjaan" />

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
                      Status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(getDataAllJob) ? (
                    getDataAllJob.map((jobAll, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {jobAll.job.nama}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {jobAll.job.perusahaan}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat( jobAll.job.tanggal_kirim,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {dateFormat( jobAll.tanggal_pengumpulan ,'dddd, dd mmmm yyyy')}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                            ${getStatusClass(
                              jobAll.job.status,
                              jobAll.job.tanggapan_customer,
                            )}

                            `}
                          >
                            {getStatusText(
                              jobAll.job.status,
                              jobAll.job.tanggapan_customer,
                            )}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
                                onClick={() =>
                                  jobAll.job.status === '6' ||
                                  jobAll.job.status === '4' ||
                                  jobAll.job.status === '2' ||
                                  jobAll.job.status === '0'
                                    ? handleOpenView(
                                        jobAll.kode,
                                        jobAll.job.nama,
                                        jobAll.job.perusahaan,
                                        jobAll.job.tanggal_kirim,
                                        jobAll.tanggal_pengumpulan,
                                        jobAll.job.status,
                                        jobAll.job.data_pendukung,
                                        jobAll.job.catatan,
                                        jobAll.job.hasil_design,
                                        jobAll.qc,
                                        1,
                                      )
                                    : jobAll.job.status === '3'
                                    ? handleOpenView(
                                        jobAll.job.kode,
                                        jobAll.job.nama,
                                        jobAll.job.perusahaan,
                                        jobAll.job.tanggal_kirim,
                                        jobAll.tanggal_pengumpulan,
                                        jobAll.job.status,
                                        jobAll.job.data_pendukung,
                                        jobAll.job.catatan,
                                        jobAll.job.hasil_design,
                                        jobAll.qc,
                                        2,
                                      )
                                    : jobAll.job.status === '5'
                                    ? handleOpenView(
                                        jobAll.job.kode,
                                        jobAll.job.nama,
                                        jobAll.job.perusahaan,
                                        jobAll.job.tanggal_kirim,
                                        jobAll.tanggal_pengumpulan,
                                        jobAll.job.status,
                                        jobAll.job.data_pendukung,
                                        jobAll.job.catatan,
                                        jobAll.job.hasil_design,
                                        jobAll.qc,
                                        3,
                                      )
                                    : ''
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
          <ViewJobMe
            onClose={() => handleClose(1)}
            open={openView}
            kode={job_kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            status={status}
            data_pendukung={data_pendukung}
            catatan={catatan}
            hasil_design={hasil_design}
          />
          <SendJob
            onClose={() => handleClose(2)}
            open={openSend}
            kode={job_kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            status={status}
            data_pendukung={data_pendukung}
            catatan={catatan}
            hasil_design={hasil_design}
          />
          <RevisionJob
            onClose={() => handleClose(3)}
            open={openRevision}
            kode={job_kode}
            nama={nama}
            perusahaan={perusahaan}
            tanggal_kirim={tanggalKirim}
            tanggal_pengumpulan={tanggal_pengumpulan}
            komentar={komentar}
            catatan={catatan}
            status={parseInt(status)}
            data_pendukung={data_pendukung}
          />
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default ListJob;
