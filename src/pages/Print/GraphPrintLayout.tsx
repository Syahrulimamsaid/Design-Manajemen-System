import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListReport from '../Report/List';
import GraphReport from '../Report/Graph';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReport, getReportDesigner } from '../../Helpers/API/Report/Report';
import { notify } from '../../Helpers/Notify/Notify';
import CalendarReport from '../Report/Calendar';

const GraphPrintLayout = () => {
  const location = useLocation();
  const { type } = location.state || {};
  const { month } = location.state || {};

  // const [type,setType]=useState('');
  // const [month,setMonth]=useState('');

  // const  type, setSelectedType] = useState('');
  // const [selectedMonth, setSelectedMonth] = useState('');

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userKode = localStorage.getItem('kode');

  const [report, setReport] = useState<Record<string, Report[]> | null>(null);
  const [countReport, setCountReport] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // setType('CALENDAR')
    // setMonth('4');
    handlerGetData();
    setTimeout(() => {
      exportChartToPDF();
      setTimeout(() => {
        navigate('/report');
      }, 3000);
    }, 1750);
  }, []);

  const exportChartToPDF = async () => {
    if (countReport === 0) {
      setCountReport(countReport + 1);
      const chartElement = document.getElementById('report');
      const now = new Date(Date.now());

      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);

        await new Promise((resolve) => {
          pdf
            .save(
              `${
                type === 'LIST'
                  ? `reportList${getMonthName(parseInt(month))}%${now}.pdf`
                  : type === 'CALENDAR'
                  ? `reportCalendar${getMonthName(parseInt(month))}%${now}.pdf`
                  : `reportGraph${getMonthName(parseInt(month))}%${now}.pdf`
              }`,
              { returnPromise: true },
            )
            .then(resolve);
        });
      }
    }
  };

  function getMonthName(monthNumber: number) {
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    return monthNames[monthNumber - 1];
  }

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

  return (
    <div className="pl-60 pr-60 pt-15 pb-15">
      <div
        className="rounded-sm border border-stroke bg-white
  shadow-default"
      >
        <div id="report" className="w-full h-full">
          <div className="p-15 flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <img
                src="src/images/logo/logoPura.png"
                onClick={exportChartToPDF}
                alt="Logo Pura"
                height={200}
                width={320}
              />
              <div className="text-center">
                <p className="mb-1 text-black font-medium font-poppins text-3xl">
                  PT Pura Barutama Rotogravure 1
                </p>
                <p className="mb-1 text-black font-bold font-poppins text-3xl">
                  Laporan Performa Designer
                </p>
                <p className="text-black font-medium font-poppins text-3xl">
                  Periode{' '}
                  {`${getMonthName(
                    parseInt(month),
                  )} ${new Date().getFullYear()}`}
                </p>
              </div>
              <div className="w-90"></div>
            </div>

            <div>
              <hr style={{ border: '1px solid black', margin: '20px 0' }} />
            </div>
            <div className="">
              {type === 'LIST' ? (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-[#edfff6] text-left dark:bg-meta-4">
                      <th className="py-3 px-4 font-medium text-black dark:text-white">
                        Nama
                      </th>
                      <th className="py-3 px-4 font-medium text-black dark:text-white">
                        Revisi
                      </th>
                      <th className="py-3 px-4 font-medium text-black dark:text-white">
                        Selesai
                      </th>
                      <th className="py-3 px-4 font-medium text-black dark:text-white">
                        Belum Selesai
                      </th>
                      <th className="py-3 px-4 font-medium text-black dark:text-white">
                        Tidak Diambil
                      </th>
                      <th className="py-3 px-4 font-medium text-black dark:text-white">
                        Rata-Rata Pengerjaan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report && report[month] ? (
                      report[month].map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#eee] dark:border-strokedark"
                        >
                          <td className="py-3 px-4 text-black text-left dark:text-white">
                            {item.designer_nama}
                          </td>
                          <td className="py-3 px-4 text-black text-left dark:text-white">
                            {item.revisi}
                          </td>
                          <td className="py-3 px-4 text-black text-left dark:text-white">
                            {item.selesai}
                          </td>
                          <td className="py-3 px-4 text-black text-left dark:text-white">
                            {item.belum_selesai}
                          </td>
                          <td className="py-3 px-4 text-black text-left dark:text-white">
                            {item.tidak_diambil}
                          </td>
                          <td className="py-3 px-4 text-black text-left dark:text-white">
                            {item.rata_pengerjaan} Hari
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
              ) : type === 'GRAPH' ? (
                <GraphReport monthSelect={month} />
              ) : type === 'CALENDAR' ? (
                <CalendarReport />
              ) : (
                <p>No report type selected.</p>
              )}
            </div>

            <ToastContainer autoClose={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphPrintLayout;
