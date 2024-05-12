import { useEffect, useState } from 'react';
import { SlPencil } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import { deleteJob, getJobPost } from '../../Helpers/API/Job/CS/PostingJobAPI';
import Swal from 'sweetalert2';
import AddJob from './AddJob';
import React from 'react';
import { SlTrash } from 'react-icons/sl';
import ViewJob from './ViewJob';
import UpdateJob from './UpdateJob';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import { SlEye } from 'react-icons/sl';
import { getStatusClass, getStatusText } from '../../Helpers/Status/Status';
import { Tooltip } from '@mui/material';
import LoaderTable from '../../layout/LoaderTable/Loader';

const PostingPekerjaan = () => {
  const [getDataJob, setDataJob] = useState<Job[] | null>(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [nama, setNama] = useState('');
  const [perusahaan, setPerusahaan] = useState('');
  const [tanggalKirim, setTanggalKirim] = useState('');
  const [catatan, setCatatan] = useState('');
  const [kode, setKode] = useState('');
  const [data, setData] = useState<DataPendukung[] | null>(null);
  const token = localStorage.getItem('token');
const [loading,setLoading]=useState(false);
  const handleOpen = (open: number) => {
    open === 1 ? setOpenAdd(true) : setOpenView(true);
  };
  const handleOpenView = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_kirim: string,
    catatan: string,
    data: any,
    open: number,
  ) => {
    open === 1 ? setOpenView(true) : setOpenUpdate(true);
    setKode(kode!);
    setNama(nama!);
    setPerusahaan(perusahaan!);
    setTanggalKirim(tanggal_kirim!);
    setCatatan(catatan!);
    setData(data);
  };

  const handleClose = (open: number) => {
    open === 1
      ? setOpenAdd(false)
      : open === 2
      ? setOpenView(false)
      : setOpenUpdate(false);
    handlerGetData();
  };

  const handlerGetData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = await getJobPost(token);
      setDataJob(data.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Ambil Data',
          text: err.message,
          confirmButtonText: 'Ok',
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  const deleteData = (kode: string) => {
    try {
      Swal.fire({
        icon: 'question',
        title: 'Delete',
        text: 'Yakin akan hapus data ini ?',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonText: 'No',
      }).then(async (res) => {
        if (res.isConfirmed) {
          await deleteJob(token, kode);
          setTimeout(() => {
            handlerGetData();
            notify('Data berhasil dihapus', 'success');
          }, 50);
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Job Posting" />

        <div className="flex flex-col gap-10">
          <div className="items-right">
            <button
              className="rounded-full bg-[#492ad8] w-50 h-15 float-right hover:bg-[#6456fe] flex items-center px-7 shadow-md justify-center"
              onClick={() => handleOpen(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height={25}
                width={25}
                fill="#ecefff"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              <p className="text-[#ecefff] font-bold text-xl ml-5">Add</p>
            </button>
          </div>

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
                  ) :getDataJob != null && getDataJob.length > 0 ? (
                    getDataJob?.map((job, index) => (
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
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              // job.status === '2'
                              //   ? 'bg-success text-success'
                              //   : 'bg-danger text-danger'
                              getStatusClass(job.status)
                            }`}
                          >
                            {
                              // job.status === '1'
                              //   ? 'Belum Terjadwal'
                              //   : 'Sudah Terjadwal'
                              getStatusText(job.status)
                            }
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Tooltip
                              children={
                                <button
                                  className= {` m-0.5 ${
                                    job.status_data === '1'
                                      ? `text-[#5537f4] hover:text-slate-900`
                                      : ''
                                  }`}
                                >
                                  <SlEye
                                    size={22}
                                    strokeWidth={25}
                                    onClick={() =>
                                      job.status_data === '1'
                                        ? handleOpenView(
                                            job.kode,
                                            job.nama,
                                            job.perusahaan,
                                            job.tanggal_kirim,
                                            job.catatan,
                                            job.data_pendukung,
                                            1,
                                          )
                                        : ''
                                    }
                                  />
                                </button>
                              }
                              title="View"
                            ></Tooltip>

                            <Tooltip
                              title="Edit"
                              children={
                                <button
                                  className= {` m-0.5 ${
                                    job.status_data === '0'
                                      ? `text-[#5537f4] hover:text-slate-900`
                                      : ''
                                  }`}
                                >
                                  <SlPencil
                                    size={22}
                                    strokeWidth={25}
                                    onClick={() =>
                                      job.status_data === '0'
                                        ? handleOpenView(
                                            job.kode,
                                            job.nama,
                                            job.perusahaan,
                                            job.tanggal_kirim,
                                            job.catatan,
                                            job.data_pendukung,
                                            2,
                                          )
                                        : ''
                                    }
                                  />
                                </button>
                              }
                            ></Tooltip>

                            <Tooltip
                              title="Delete"
                              children={
                                <button
                                  className={` m-1 ${
                                    job.status === '1'
                                      ? `text-red-500 hover:text-slate-900`
                                      : ''
                                  } `}
                                  onClick={() =>
                                    job.status === '1'
                                      ? deleteData(job.kode)
                                      : ''
                                  }
                                >
                                  <SlTrash size={22} strokeWidth={25} />
                                </button>
                              }
                            ></Tooltip>
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
      <AddJob open={openAdd} onClose={() => handleClose(1)} />
      <ViewJob
        open={openView}
        onClose={() => handleClose(2)}
        kode={kode}
        nama={nama}
        perusahaan={perusahaan}
        tanggal_kirim={tanggalKirim}
        catatan={catatan}
        data_pendukung={data}
      />
      <UpdateJob
        open={openUpdate}
        onClose={() => handleClose(3)}
        kode={kode}
        nama={nama}
        perusahaan={perusahaan}
        tanggal_kirim={tanggalKirim}
        catatan={catatan}
        data_pendukung={data}
      />
    </>
  );
};

export default PostingPekerjaan;
