import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getReport, getReportDesigner } from '../../Helpers/API/Report/Report';
import { notify } from '../../Helpers/Notify/Notify';

export interface ListProps {
  month: string;
}

const ListReport = (props: ListProps) => {
  const { month } = props;
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userKode = localStorage.getItem('kode');
  const [report, setReport] = useState<Record<string, Report[]> | null>(null);

  const handlerGetData = async () => {
    try {
      if (role == '1' || role == '2' || role == '3') {
        const report = await getReport(token);
        setReport(report.data);
      } else {
        const report = await getReportDesigner(token, userKode);
        setReport(report.data);
      }
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
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-[#edfff6] text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Nama
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Revisi
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Selesai
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Belum Selesai
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Tidak Diambil
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Rata - Rata Pengerjaan
            </th>
          </tr>
        </thead>
        <tbody>
          {report && report[month] ? (
            report[month].map((report, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {report.designer_nama}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{report.revisi}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{report.selesai}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {report.belum_selesai}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {report.tidak_diambil}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {report.rata_pengerjaan} Hari
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
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default ListReport;
