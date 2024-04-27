import {  useEffect, useState } from 'react';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import { deleteJob, getJobPost } from '../../Helpers/API/Job/CS/PostingJobAPI';
import Swal from 'sweetalert2';
import AddJob from './AddJob';
import React from 'react';
import { SlTrash } from 'react-icons/sl';
import ViewJob from './ViewJob';
import UpdateJob from './UpdateJob';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

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
    console.log(data);
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
    try {
      const token = localStorage.getItem('token');
      const data = await getJobPost(token);
      setDataJob(data.data);
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
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  const deleteData = (kode: string) => {
    try {
      Swal.fire({
        icon: 'question',
        title: 'Hapus Data',
        text: 'Yakin akan hapus data ini ?',
        confirmButtonText: 'Iya',
        showCancelButton: true,
        cancelButtonText:'Tidak'
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
        <Breadcrumb pageName="Posting Pekerjaan" />

        <div className="flex flex-col gap-10">
          <div className="items-right">
            <button
              className="rounded-full bg-[#00eb77] w-50 h-15 float-right hover:bg-[#06da6c] flex items-center px-7 shadow-md"
              onClick={() => handleOpen(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height={25}
                width={25}
                fill="#565656"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              <p className="text-white font-bold text-xl ml-5">Tambah</p>
            </button>
          </div>

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
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDataJob != null && getDataJob.length > 0 ? (
                    getDataJob?.map((job, index) => (
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
                            {dateFormat(
                              job.tanggal_kirim,
                              'dddd, dd mmmm yyyy',
                            )}
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
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              job.status === '2'
                                ? 'bg-success text-success'
                                : 'bg-danger text-danger'
                            }`}
                          >
                            {job.status === '1'
                              ? 'Belum Terjadwal'
                              : 'Sudah Terjadwal'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
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
                                    : handleOpenView(
                                        job.kode,
                                        job.nama,
                                        job.perusahaan,
                                        job.tanggal_kirim,
                                        job.catatan,
                                        job.data_pendukung,
                                        2,
                                      )
                                }
                              />
                            </button>
                            {job.status === '1' ? (
                              <button
                                className="hover:text-success"
                                onClick={() => deleteData(job.kode)}
                              >
                                <SlTrash size={20} />
                              </button>
                            ) : (
                              ''
                            )}
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
