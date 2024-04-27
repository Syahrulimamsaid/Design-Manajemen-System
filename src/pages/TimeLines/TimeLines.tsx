import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SlArrowRightCircle } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import { getJob } from '../../Helpers/API/Job/Job';
import { useNavigate } from 'react-router-dom';
import { getAllJob } from '../../Helpers/API/Job/Designer/ListJob';
import dateFormat from 'dateformat';
import { getStatusClass, getStatusText } from '../../Helpers/Status/Status';

const TimeLinesJob = () => {
  const [getDataAllJob, setDataAllJob] = useState<JobAssignment[] | null>(null);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handlerGetData = async () => {
    try {
      if (role != '4') {
        const allJob = await getJob(token);
        setDataAllJob(allJob.data);
      } else {
        const allJobMe = await getAllJob(token);
        setDataAllJob(allJobMe.data);
      }
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  const handleToDetail = (
    kode: string,
    nama: string,
    perusahaan: string,
    tanggal_kirim: string,
    tanggal_pengumpulan: string,
    status:number
  ) => {
    navigate('/detailtimelines', {
      state: {
        kode: kode,
        nama: nama,
        perusahaan: perusahaan,
        tanggal_kirim: tanggal_kirim,
        tanggal_pengumpulan: tanggal_pengumpulan,
        status:status
      },
    });
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Garis Waktu Pekerjaan" />

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
                    {role != '4' ? (
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Designer
                      </th>
                    ) : (
                      ''
                    )}
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
                            {dateFormat(
                              jobAll.job.tanggal_kirim,
                              'dddd, dd mmmm yyyy',
                            )}
                          </p>
                        </td>
                        {role != '4' ? (
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {jobAll.designer.nama}
                            </p>
                          </td>
                        ) : (
                          ''
                        )}
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                            ${
                              // jobAll.job.status === '2'
                              //   ? 'bg-slate-500 text-slate-500'
                              //   : jobAll.job.status === '3'
                              //   ? 'bg-primary text-primary'
                              //   : jobAll.job.status === '4'
                              //   ? 'bg-purple-500 text-purple-500'
                              //   : jobAll.job.status === '5'
                              //   ? 'bg-danger text-danger'
                              //   : jobAll.job.status === '6'
                              //   ? 'bg-success text-success'
                              //   : jobAll.job.status === '0'
                              //   ? 'bg-pink-800 text-pink-800'
                              //   : jobAll.job.status === '1'
                              //   ? 'bg-lime-500 text-lime-500'
                              //   : 'bg-warning text-warning'

                              getStatusClass(jobAll.job.status,jobAll.job.tanggapan_customer)
                            }
                            `
                          }
                          >
                            {
                            // jobAll.job.status === '2'
                            //   ? 'Terjadwal'
                            //   : jobAll.job.status === '3'
                            //   ? 'Pengerjaan'
                            //   : jobAll.job.status === '4'
                            //   ? 'Dikumpulkan'
                            //   : jobAll.job.status === '5'
                            //   ? 'Revisi'
                            //   : jobAll.job.status === '6'
                            //   ? 'Selesai'
                            //   : jobAll.job.status === '0'
                            //   ? 'Pemeriksaan'
                            //   : jobAll.job.status === '1'
                            //   ? 'Belum Terjadwal'
                            //   : 'Tidak Terdefinisi'

                            getStatusText(jobAll.job.status,jobAll.job.tanggapan_customer)
                              }
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button className="hover:text-success">
                              <SlArrowRightCircle
                                size={20}
                                onClick={() =>
                                  handleToDetail(
                                    jobAll.kode,
                                    jobAll.job.nama,
                                    jobAll.job.perusahaan,
                                    jobAll.job.tanggal_kirim,
                                    jobAll.tanggal_pengumpulan,
                                    parseInt(jobAll.job.status)
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
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default TimeLinesJob;
