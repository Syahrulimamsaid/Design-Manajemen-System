import { lineSpinner } from 'ldrs';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getReport,
  getReportDesigner,
  getRevisionDetail,
} from '../../Helpers/API/Report/Report';
import { notify } from '../../Helpers/Notify/Notify';

export interface ListProps {
  month: string;
}

const ListReport = (props: ListProps) => {
  const { month } = props;
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userKode = localStorage.getItem('kode');
  const [report, setReport] = useState<Report[] | null>(null);
  const [detail, setDetail] = useState<RevisionDetail[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [Index, setIndex] = useState(0);

  const handlerGetData = async () => {
    setLoading(true);
    try {
      if (role == '1' || role == '2' || role == '3') {
        const report = await getReport(token);
        setReport(report.data);
        setLoading(false);
      } else {
        const report = await getReportDesigner(token, userKode);
        setReport(report.data);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
        setLoading(false);
      }
    }
  };

  const handleShow = async (index: number, kode: string) => {
    try {
      const detail = await getRevisionDetail(token, kode);
      setDetail(detail.data);
    } catch (err: any) {
      notify(err.response.data.message, 'error');
    }
    Index === index ? setStatus(!status) : '';
    setIndex(index);
  };

  lineSpinner.register();

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-[#c2c9ff] text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-[#201650] dark:text-white xl:pl-11">
              Nama
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
              Belum Diambil
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] dark:text-white">
              Selesai
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
              On Progress
            </th>
            <th className="min-w-[120px] py-4 px-4 font-medium text-[#201650] dark:text-white">
              Acc
            </th>
            <th className="py-4 px-4 font-medium text-[#201650] dark:text-white">
              Revisi
            </th>
          </tr>
        </thead>
        <tbody>
          {report && report[month] ? (
            report[month].map((report, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark text-start xl:pl-11">
                  <h5 className="font-medium text-[#201650] dark:text-white">
                    {report.designer_nama}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-start">
                  <p className="text-[#201650] dark:text-white">
                    {report.belum_diambil}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-start">
                  <p className="text-[#201650] dark:text-white">
                    {report.selesai}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-start">
                  <p className="text-[#201650] dark:text-white">
                    {report.on_progress}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-start">
                  <p className="text-[#201650] dark:text-white">{report.acc}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-start">
                  <p className="text-[#201650] dark:text-white">
                    {report.revisi}
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
