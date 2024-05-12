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
import { SlInfo } from 'react-icons/sl';
import path from 'path';

export interface ListProps {
  month: string;
}

const CardReport = (props: ListProps) => {
  const { month } = props;
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userKode = localStorage.getItem('kode');
  const [report, setReport] = useState<Report[] | null>(null);
  const [detail, setDetail] = useState<RevisionDetail[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [Index, setIndex] = useState(0);

  const { pathname } = location;

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

  const handleShow = async () => {
    // try {
    //   const detail = await getRevisionDetail(token, kode);
    //   setDetail(detail.data);
    // } catch (err: any) {
    //   notify(err.response.data.message, 'error');
    // }
    // Index === index ? setStatus(!status) : '';
    // setIndex(index);

    if (pathname.includes('/printlayout')) {
      setStatus(true);
    }
    setStatus(!status);
  };

  lineSpinner.register();

  useEffect(() => {
    handlerGetData();

    handleShow();
  }, []);

  return (
    <>
      {/* <table className="w-full table-auto">
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
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-[#201650] dark:text-white">
                    {report.designer_nama}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-[#201650] dark:text-white">{report.belum_diambil}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-[#201650] dark:text-white">{report.selesai}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-[#201650] dark:text-white">
                    {report.on_progress}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-[#201650] dark:text-white">
                    {report.acc}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
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
      </table> */}
      <div className="grid grid-cols-3 gap-5 w-full">
        {report && report[month] ? (
          report[month].map((report, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col gap-10">
                <div className="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:class md:class xl:pb-1 ">
                  <div className="max-w-full overflow-x-auto">
                    <div className="m-2 transition duration-300 ease-in">
                      <div className="flex flex-col gap-5 p-4">
                        <div className="flex items-center gap-4 ">
                          <div className="flex justify-center items-center relative">
                            <div className="rounded-full bg-[#5537f4]  flex justify-center items-center sm:w-7 sm:h-7 md:w-15 md:h-15">
                              {' '}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                // width={30}
                                // height={30}
                                fill="#ecefff"
                                className="md:w-7 md:h-7 sm:w-4 sm:h-4"
                              >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                              </svg>
                            </div>
                            <p className="font-bold text-[#201650] md:text-xl sm:text-md ml-5">
                              {report.designer_nama}
                            </p>
                          </div>
                          {/* <div className="ml-auto bg-red-500">
                            <div className="bg-red-500 m-4 text-white ">
                              Perempuan
                            </div>
                          </div> */}
                        </div>
                        <div className="flex items-center gap-4 xl:flex-row w-full">
                          <div className="w-full xl:w-1/2 flex flex-row gap-4">
                            <svg
                              className="ml-4 md:w-5.5 md:h-5.5 sm:w-4 sm:h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              // width={22}
                              // height={22}
                              fill="#1c192e"
                            >
                              <path d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64V261.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75H296h8c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5V160c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2V96c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1c0 0 0-.1 0-.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16V95.9c0 0 0 .1 0 .1V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16v55.9c0 0 0 .1 0 .1v80c0 13.3 10.7 24 24 24s24-10.7 24-24V160.1c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16V332.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2H296h-8.5c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z" />
                            </svg>
                            <p className="md:text-xl sm:text-md"> Diambil</p>
                          </div>
                          <div className="w-full xl:w-1/2 sm:w-1/6">
                            <p className="md:text-xl sm:text-md font-bold text-[#201650]">
                              {' '}
                              : {report.belum_diambil}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 xl:flex-row w-full">
                          <div className="w-full xl:w-1/2 flex flex-row gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              // width={22}
                              // height={22}
                              fill="#1c192e"
                              className="ml-4 md:w-5.5 md:h-5.5 sm:w-4 sm:h-4"
                            >
                              <path d="M91.7 96C106.3 86.8 116 70.5 116 52C116 23.3 92.7 0 64 0S12 23.3 12 52c0 16.7 7.8 31.5 20 41l0 3 0 48 0 256 0 48 0 64 48 0 0-64 389.6 0c14.6 0 26.4-11.8 26.4-26.4c0-3.7-.8-7.3-2.3-10.7L432 272l61.7-138.9c1.5-3.4 2.3-7 2.3-10.7c0-14.6-11.8-26.4-26.4-26.4L91.7 96zM80 400l0-256 356.4 0L388.1 252.5c-5.5 12.4-5.5 26.6 0 39L436.4 400 80 400z" />
                            </svg>
                            <p className="md:text-xl sm:text-md"> Selesai : </p>
                          </div>
                          <div className="w-full xl:w-1/2 sm:w-1/6">
                            <p className="md:text-xl sm:text-md font-bold text-[#201650]">
                              {' '}
                              : {report.selesai}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 xl:flex-row w-full">
                          <div className="w-full xl:w-1/2 flex flex-row gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              // width={22}
                              // height={22}
                              fill="#1c192e"
                              className="ml-4 md:w-5.5 md:h-5.5 sm:w-4 sm:h-4"
                            >
                              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                            </svg>
                            <p className="md:text-xl sm:text-md ">
                              {' '}
                              On Progress
                            </p>
                          </div>
                          <div className="w-full xl:w-1/2 sm:w-1/6">
                            <p className="md:text-xl sm:text-md font-bold text-[#201650]">
                              {' '}
                              : {report.on_progress}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 xl:flex-row w-full">
                          <div className="w-full xl:w-1/2 flex flex-row gap-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              // width={22}
                              // height={22}
                              fill="#1c192e"
                              className="ml-4 md:w-5.5 md:h-5.5 sm:w-4 sm:h-4"
                            >
                              <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                            </svg>
                            <p className="md:text-xl sm:text-md"> Acc</p>
                          </div>
                          <div className="w-full xl:w-1/2 sm:w-1/6">
                            <p className="md:text-xl sm:text-md font-bold text-[#201650]">
                              {' '}
                              : {report.acc}
                            </p>
                          </div>
                        </div>
                        <div
                          className={
                            status
                              ? 'bg-[#f3f5ff] rounded-md transition duration-50 ease-in pt-2'
                              : ''
                          }
                        >
                          <div
                            className="flex items-center gap-4 hover:bg-[#ECEFFF] rounded-md"
                            onClick={() => handleShow()}
                          >
                            <div className="w-full xl:w-1/2 flex flex-row gap-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                // width={22}
                                // height={22}
                                fill="#1c192e"
                                className="ml-4 md:w-5.5 md:h-5.5 sm:w-4 sm:h-4"
                              >
                                <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                              </svg>
                              <p className="md:text-xl sm:text-md"> Revisi</p>
                            </div>
                            <div className="w-full xl:w-1/2 sm:w-1/6">
                              <p className="md:text-xl sm:text-md font-bold text-[#201650]">
                                {' '}
                                : {report.revisi}
                              </p>
                            </div>
                          </div>
                          <div
                            className={
                              status ? `w-full pl-13.5 mt-3 pb-3` : 'hidden'
                            }
                          >
                            {
                              <div className="w-full flex flex-col">
                                <div className="flex items-center xl:flex-row w-full">
                                  <div className="w-full xl:w-1/1">
                                    <h3 className="text-semibold gap-2 flex md:text-base sm:text-sm">
                                       Koordinator
                                    </h3>
                                  </div>
                                  <div className="w-full xl:w-1/1">
                                    <p className="font-semibold text-[#201650] md:text-base sm:text-sm">
                                      {` : ${report.reject_koor}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center xl:flex-row w-full">
                                  <div className="w-full xl:w-1/1">
                                    <h3 className="text-semibold gap-2 flex md:text-base sm:text-sm"> Quality Control</h3>
                                  </div>
                                  <div className="w-full xl:w-1/1">
                                    {' '}
                                    <p className="font-semibold text-[#201650] md:text-base sm:text-sm">
                                      {` : ${report.reject_qc}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-centerxl:flex-row w-full">
                                  <div className="w-full xl:w-1/1">
                                    <h3 className="text-semibold gap-2 flex md:text-base sm:text-sm">
                                       Customer
                                    </h3>
                                  </div>
                                  <div className="w-full xl:w-1/1">
                                    <p className="font-semibold text-[#201650] md:text-base sm:text-sm">
                                      {` : ${report.reject_customer}`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-md shadow-md w-full p-7 items-center flex">
            <div className="items-center flex justif-center gap-5">
              <SlInfo size={25} strokeWidth={20} color="#3b25ae" />
              <p className="text-[#707070] font-nordmal text-md font-poppins">
                Data tidak ada.
              </p>
            </div>
          </div>
        )}

        {/* <div className="flex flex-col gap-10">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className="m-2 transition duration-300 ease-in">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-[#5537f4] w-15 h-15 flex justify-center items-center">
                      {' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width={30}
                        height={30}
                        fill="#ecefff"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                    <p className="font-bold text-[#201650] md:text-xl sm:text-md">
                      Sunjoyo Reborn
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      className="ml-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={22}
                      height={22}
                      fill="#1c192e"
                    >
                      <path d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64V261.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75H296h8c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5V160c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2V96c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1c0 0 0-.1 0-.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16V95.9c0 0 0 .1 0 .1V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16v55.9c0 0 0 .1 0 .1v80c0 13.3 10.7 24 24 24s24-10.7 24-24V160.1c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16V332.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2H296h-8.5c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z" />
                    </svg>
                    <p className="md:text-xl sm:text-md"> 10</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={22}
                      height={22}
                      fill="#1c192e"
                      className="ml-4"
                    >
                      <path d="M91.7 96C106.3 86.8 116 70.5 116 52C116 23.3 92.7 0 64 0S12 23.3 12 52c0 16.7 7.8 31.5 20 41l0 3 0 48 0 256 0 48 0 64 48 0 0-64 389.6 0c14.6 0 26.4-11.8 26.4-26.4c0-3.7-.8-7.3-2.3-10.7L432 272l61.7-138.9c1.5-3.4 2.3-7 2.3-10.7c0-14.6-11.8-26.4-26.4-26.4L91.7 96zM80 400l0-256 356.4 0L388.1 252.5c-5.5 12.4-5.5 26.6 0 39L436.4 400 80 400z" />
                    </svg>
                    <p className="md:text-xl sm:text-md"> 7</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={22}
                      height={22}
                      fill="#1c192e"
                      className="ml-4"
                    >
                      <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                    </svg>
                    <p className="md:text-xl sm:text-md"> 3</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={22}
                      height={22}
                      fill="#1c192e"
                      className="ml-4"
                    >
                      <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                    </svg>
                    <p className="md:text-xl sm:text-md"> 5</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={22}
                      height={22}
                      fill="#1c192e"
                      className="ml-4"
                    >
                      <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                    </svg>
                    <p className="md:text-xl sm:text-md"> 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default CardReport;
