import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helpers/Notify/Notify';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTimelines } from '../../Helpers/API/TimeLines/TimeLines';
import dateFormat from 'dateformat';

const DetailTimeLinesJob = () => {
  const location = useLocation();
  const { kode } = location.state || {};
  const { nama } = location.state || {};
  const { perusahaan } = location.state || {};
  const { tanggal_kirim } = location.state || {};
  const { tanggal_pengumpulan } = location.state || {};
  const { designer } = location.state || {};
  const { status } = location.state || {};

  const role = localStorage.getItem('role');

  const [getDataTimeLines, setDataTimeLines] = useState<TimeLines[] | null>(
    null,
  );
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handlerGetData = async () => {
    try {
      const allJob = await getTimelines(token, kode);
      setDataTimeLines(allJob.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  const handleToHome = () => {
    navigate('/timelines');
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  const showIcon = (event: string) => {
    const fill = '#f7f7f5';

    if (/Pengumpulan\sRevisi/.test(event)) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill={fill}
        >
          <path d="M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z" />
        </svg>
      );
    } else if (/Penjadwalan\sRevisi/.test(event)) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill={fill}
        >
          <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm80 64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80z" />
        </svg>
      );
    } else {
      switch (event) {
        case 'Mulai Pengerjaan':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill={fill}
            >
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          );
        case 'Pengumpulan':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={fill}
            >
              <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
            </svg>
          );
        case 'Tidak Lolos QC':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={fill}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          );
        case 'Tidak Lolos Koordinator':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={fill}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          );
        case 'Lolos QC':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={fill}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          );
        case 'Lolos Koordinator':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={fill}
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          );
        case 'Pekerjaan diterima Customer':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill={fill}
            >
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          );
        case 'Pekerjaan ditolak Customer':
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={fill}
            >
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          );
      }
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Detail Garis Waktu Pekerjaan" />

        <div className="flex flex-col gap-10">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <div className="p-6.5 mb-4.5">
                <div className="flex justify-between">
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Nama
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                        {nama}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Perusahaan
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {perusahaan}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Tanggal Kirim
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {dateFormat(tanggal_kirim, 'dddd, dd mmmm yyyy')}
                      </label>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 text-center">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                        Tanggal Pengumpulan
                      </label>
                      <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white ">
                        {dateFormat(tanggal_pengumpulan, 'dddd, dd mmmm yyyy')}
                      </label>
                    </div>
                  </div>
                  {role != '4' ? (
                    <div className="w-full xl:w-1/3 text-center">
                      <div className="mb-4.5">
                        <label className="mb-2.5 block font-poppins font-semibold text-black dark:text-white">
                          Designer
                        </label>
                        <label className="mb-2.5 block font-poppins font-medium text-slate-600 dark:text-white">
                          {designer}
                        </label>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="experience mt-20">
                  {getDataTimeLines != null && getDataTimeLines.length > 0 ? (
                    <VerticalTimeline lineColor="#b3b3b3" animate={true}>
                      {getDataTimeLines?.map((timelines) => (
                        <VerticalTimelineElement
                          className="vertical-timeline-element--education"
                          iconStyle={{ background: '#00eb77' }}
                          contentArrowStyle={{
                            // background: '#000',
                            borderRight: '7px solid  #00eb77',
                          }}
                          icon={showIcon(timelines.event)}
                          contentStyle={{
                            background: '#cffad9',
                            color: '#000',
                            fontFamily: 'poppins',
                            fontWeight: 'medium',
                          }}
                          date={dateFormat(
                            timelines.tanggal_event,
                            'dddd, dd mmmm yyyy || HH:MM:ss',
                          )}
                        >
                          <h3 className="vertical-timeline-element-title">
                            {timelines.event}
                          </h3>
                        </VerticalTimelineElement>
                      ))}

                      {status == 6 ? (
                        <VerticalTimelineElement
                          iconStyle={{ background: '#e8e80c' }}
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              fill="#f7f7f5"
                            >
                              <path d="M91.7 96C106.3 86.8 116 70.5 116 52C116 23.3 92.7 0 64 0S12 23.3 12 52c0 16.7 7.8 31.5 20 41l0 3 0 352 0 64 64 0 0-64 373.6 0c14.6 0 26.4-11.8 26.4-26.4c0-3.7-.8-7.3-2.3-10.7L432 272l61.7-138.9c1.5-3.4 2.3-7 2.3-10.7c0-14.6-11.8-26.4-26.4-26.4L91.7 96z" />
                            </svg>
                          }
                        ></VerticalTimelineElement>
                      ) : (
                        ''
                      )}
                    </VerticalTimeline>
                  ) : (
                    <h3 className="font-poppins font-semibold text-center text-3xl">
                      {' '}
                      TimeLines tidak ada
                    </h3>
                  )}
                </div>
                <div className="mt-20">
                  {' '}
                  <button
                    onClick={handleToHome}
                    className="flex w-full justify-center rounded rounded-lg bg-[#00eb77] p-3 font-poppins font-medium text-slate-50 hover:bg-opacity-70"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default DetailTimeLinesJob;
