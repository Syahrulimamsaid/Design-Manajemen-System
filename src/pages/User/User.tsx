import { useEffect, useState } from 'react';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import { deleteJob, getJobPost } from '../../Helpers/API/Job/CS/PostingJobAPI';
import Swal from 'sweetalert2';
import { SlTrash } from 'react-icons/sl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import dateFormat from 'dateformat';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { deleteUser, getUser } from '../../Helpers/API/User/UserAPI';

const User = () => {
  const [getDataUser, setDataUser] = useState<User[] | null>(null);
  const token = localStorage.getItem('token');

  // const handleOpen = (open: number) => {
  //   open === 1 ? setOpenAdd(true) : setOpenView(true);
  // };

  // const handleOpenView = (
  //   kode: string,
  //   nama: string,
  //   perusahaan: string,
  //   tanggal_kirim: string,
  //   catatan: string,
  //   data: any,
  //   open: number,
  // ) => {
  //   open === 1 ? setOpenView(true) : setOpenUpdate(true);
  //   setKode(kode!);
  //   setNama(nama!);
  //   setPerusahaan(perusahaan!);
  //   setTanggalKirim(tanggal_kirim!);
  //   setCatatan(catatan!);
  //   setData(data);
  //   console.log(data);
  // };

  // const handleClose = (open: number) => {
  //   open === 1
  //     ? setOpenAdd(false)
  //     : open === 2
  //     ? setOpenView(false)
  //     : setOpenUpdate(false);
  //   handlerGetData();
  // };

  const handlerGetUser = async () => {
    try {
      const data = await getUser(token);
      setDataUser(data.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    handlerGetUser();
  }, []);

  const deleteData = (kode: string) => {
    try {
      Swal.fire({
        icon: 'question',
        title: 'Hapus User',
        text: 'Yakin akan hapus User ini ?',
        confirmButtonText: 'Iya',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
      }).then(async (res) => {
        if (res.isConfirmed) {
          await deleteUser(token, kode);
          setTimeout(() => {
            handlerGetUser();
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
        <Breadcrumb pageName="User" />

        <div className="flex flex-col gap-10">
          <div className="items-right">
            <button
              className="rounded-full bg-[#00eb77] w-50 h-15 float-right hover:bg-[#06da6c] flex items-center px-7 shadow-md"
              // onClick={() => handleOpen(1)}
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
                  <tr className="bg-[#EFFEFB] text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Kode
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Username
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Nama
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Jenis Kelamin
                    </th>
                    {/* <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Password
                    </th> */}
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Role
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getDataUser != null && getDataUser.length > 0 ? (
                    getDataUser?.map((user, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {user.kode}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.username}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.nama}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.jenis_kelamin.toString() === '1'
                              ? 'Laki - Laki'
                              : 'Perempuan'}
                          </p>
                        </td>
                        {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.password}
                          </p>
                        </td> */}
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {user.role.toString() === '1'
                              ? 'Koordinator'
                              : user.role.toString() === '2'
                              ? 'Customer Service'
                              : user.role.toString() === '3'
                              ? 'Quality Control'
                              : user.role.toString() === '4'
                              ? 'Designer'
                              : user.role.toString() === '5'
                              ? 'EDP'
                              : 'Tidak Terdefinisi'}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            {/* <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
                                onClick={() =>
                                  // user.status_data === '1'
                                  //   ? handleOpenView(
                                  //       user.kode,
                                  //       user.nama,
                                  //       user.perusahaan,
                                  //       user.tanggal_kirim,
                                  //       user.catatan,
                                  //       user.data_pendukung,
                                  //       1,
                                  //     )
                                  //   : handleOpenView(
                                  //       user.kode,
                                  //       user.nama,
                                  //       user.perusahaan,
                                  //       user.tanggal_kirim,
                                  //       user.catatan,
                                  //       user.data_pendukung,
                                  //       2,
                                  //     )
                                }
                              />
                            </button> */}
                            {
                              <button
                                className="hover:text-success"
                                onClick={() => deleteData(user.kode)}
                              >
                                <SlTrash size={20} />
                              </button>
                            
                            }
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
    </>
  );
};

export default User;
