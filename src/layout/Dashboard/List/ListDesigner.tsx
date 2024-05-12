import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../../Helpers/Notify/Notify';
import { dateFormatID } from '../../../Helpers/Date/FormatDate';
import {
  commentCustomer,
  commentQC,
  urgentDeadline,
} from '../../../Helpers/API/DashboardAPI';
import { getStatusClass, getStatusText } from '../../../Helpers/Status/Status';
import { useNavigate } from 'react-router-dom';

const ListDesigner = () => {
  const token = localStorage.getItem('token');
  const [urgentDeadlineData, setUrgent] = useState<JobAssignment[] | null>(
    null,
  );

  const navigate = useNavigate();

  const handleTo = () => {
    navigate('/listjob');
  };

  const handleUrgentDeadline = async () => {
    try {
      const urgent = await urgentDeadline(token);
      setUrgent(urgent.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    handleUrgentDeadline();
  }, []);

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#DDE2FF] text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white xl:pl-11">
                Kode
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                Preparate
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                Customer
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                Tanggal Pengumpulan
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody
            className={
              urgentDeadlineData != null && urgentDeadlineData?.length > 0
                ? 'hover:bg-slate-100 transition cursor-pointer hover:cursor-pointer'
                : ''
            }
            onClick={handleTo}
          >
            {urgentDeadlineData != null && urgentDeadlineData.length>0 ? (
              urgentDeadlineData?.map((urgent, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className=" text-[#201650] text-sm dark:text-white">
                      {urgent.job.kode}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-[#201650] text-sm dark:text-white">
                      {urgent.job.nama}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-[#201650] text-sm dark:text-white">
                      {urgent.job.perusahaan}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-[#201650] text-sm dark:text-white">
                      {dateFormatID(urgent.tanggal_pengumpulan)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex text-center rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                            ${getStatusClass(
                              urgent.job.status,
                              urgent.job.tanggapan_customer,
                            )}

                            `}
                    >
                      {getStatusText(
                        urgent.job.status,
                        urgent.job.tanggapan_customer,
                      )}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-5 px-4 text-center dark:border-strokedark"
                >
                  Tidak ada pekerjaan darurat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListDesigner;
