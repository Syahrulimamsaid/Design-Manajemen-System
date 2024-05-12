import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {  SlEye } from 'react-icons/sl';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import { getJob } from '../../Helpers/API/Job/Job';
import { useNavigate } from 'react-router-dom';
import { getAllJob } from '../../Helpers/API/Job/Designer/ListJob';
import { getStatusClass, getStatusText } from '../../Helpers/Status/Status';
import { dateFormatID } from '../../Helpers/Date/FormatDate';
import { Tooltip } from '@mui/material';
import LoaderTable from '../../layout/LoaderTable/Loader';

const TimeLinesJob = () => {
  const [getDataAllJob, setDataAllJob] = useState<JobAssignment[] | null>(null);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [loading,setLoading]=useState(false);

  const handlerGetData = async () => {
    setLoading(true);
    try {
      if (role != '4') {
        const allJob = await getJob(token);
        setDataAllJob(allJob.data);
        setLoading(false);
      } else {
        const allJobMe = await getAllJob(token);
        setDataAllJob(allJobMe.data);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
      setLoading(false);
    }
  };

  const handleToDetail = (
    kode: string,
    job_kode: string,
    nama: string,
    perusahaan: string,
    tanggal_kirim: string,
    tanggapan_customer: number,
    status: number,
    designer?: string,
  ) => {
    navigate('/detailtimelines', {
      state: {
        kode: kode,
        job_kode: job_kode,
        nama: nama,
        perusahaan: perusahaan,
        tanggal_kirim: tanggal_kirim,
        tanggapan_customer: tanggapan_customer,
        designer: designer!,
        status: status,
      },
    });
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Traceability" />

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
                    {role != '4' ? (
                      <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
                        Designer
                      </th>
                    ) : (
                      ''
                    )}
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
                  ) :getDataAllJob != null && getDataAllJob.length > 0 ? (
                    Array.isArray(getDataAllJob) ? (
                      getDataAllJob.map((jobAll, index) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-[#201650] dark:text-white">
                              {jobAll.job.kode}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-[#201650] dark:text-white">
                              {jobAll.job.nama}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-[#201650] dark:text-white">
                              {jobAll.job.perusahaan}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-[#201650] dark:text-white">
                              {dateFormatID(jobAll.job.tanggal_kirim)}
                            </p>
                          </td>
                          {role != '4' ? (
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-[#201650] dark:text-white">
                                {jobAll.designer.nama}
                              </p>
                            </td>
                          ) : (
                            ''
                          )}
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
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
                              <Tooltip
                                title="View"
                                children={
                                  <button className="text-[#5537f4] hover:text-slate-900 m-0.5">
                                    <SlEye
                                      size={22}
                                      strokeWidth={25}
                                      onClick={() =>
                                        handleToDetail(
                                          jobAll.kode,
                                          jobAll.job.kode,
                                          jobAll.job.nama,
                                          jobAll.job.perusahaan,
                                          jobAll.job.tanggal_kirim,
                                          jobAll.job.tanggapan_customer,
                                          parseInt(jobAll.job.status),
                                          role != '4'
                                            ? jobAll.designer.nama
                                            : '',
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
                    )
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
