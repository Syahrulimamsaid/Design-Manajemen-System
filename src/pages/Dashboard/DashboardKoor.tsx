import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { getDashboard, topDesigner } from '../../Helpers/API/DashboardAPI';
import { notify } from '../../Helpers/Notify/Notify';
import { getCuaca } from '../../Helpers/API/Data/Cuaca/Cuaca';
import { useTranslation } from 'react-i18next';
import translateToIndonesian from '../../Helpers/Translate/Translate';
import ChartKoor from '../../layout/Dashboard/Chart/ChartKoor';
import { ToastContainer } from 'react-toastify';
import ListNotif from '../../layout/Dashboard/List/ListNotif';
import {
  getCheckNotif,
  getRevisionNotif,
} from '../../Helpers/API/Job/Koor/Notif';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardKoor: React.FC = () => {
  interface DashboardData {
    total_job?: number;
    sudah_plotting?: number;
    sudah_diambil?: number;
    belum_diambil?: number;
    job_completed?: number;
    job_in_progress?: number;
    job_handled?: number;
    job_accepted?: number;
  }

  const [dataDash, setDataDash] = useState<DashboardData | null>(null);
  const [dataCuaca, setCuaca] = useState<[] | null>(null);
  const [topDesignerData, setTopDesigner] = useState<any | null>(null);

  const [timeNow, setTimeNow] = useState('');
  const [time, setTime] = useState(new Date());

  const token = localStorage.getItem('token');
  const [sumRevNotif, setSumRevNotif] = useState(0);
  const [sumCheNotif, setSumCheNotif] = useState(0);

  const navigate = useNavigate();

  const handleTo = (to: any) => {
    navigate(to);
  };

  useEffect(() => {
    getDataDash();
    handleTimeNow();
    handleTopDesigner();
    handleGetRevNotif();
    handleGetCheckNotif();
    // handleCuaca();
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const handleTopDesigner = async () => {
    try {
      const data = await topDesigner(token).then((res: any) => {
        setTopDesigner(
          res.sort((a: any, b: any) => {
            return b.total_job - a.total_job;
          }),
        );
      });
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  const tick = () => {
    const now = new Date();
    const hours = now.getHours();
    const a = `${hours < 10 ? '0' + hours : hours}:00:00`;
    if (a != timeNow) {
      // handleTimeNow();
      // handleCuaca();
    }
    setTime(new Date());
  };

  const role = localStorage.getItem('role');
  const nama = localStorage.getItem('nama');

  const getDataDash = async () => {
    try {
      const data = await getDashboard(token);
      setDataDash(data.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  const handleTimeNow = () => {
    const now = new Date();
    const hours = now.getHours();
    setTimeNow(`${hours < 10 ? '0' + hours : hours}:00:00`);
  };

  const handleCuaca = async () => {
    try {
      const cuaca = await getCuaca();

      const now = new Date();
      const hours = now.getHours();
      const timeNow = `${hours < 10 ? '0' + hours : hours}:00:00`;

      let filteredCuaca = null;
      if (cuaca && cuaca.days && timeNow) {
        const todayCuaca = cuaca.days.find(
          (day: any) => day.datetime === now.toISOString().split('T')[0],
        );
        // if (todayCuaca && todayCuaca.hours) {
        //   const currentHourCuaca = todayCuaca.hours.find((hour:any) => hour.datetime === timeNow);
        //   if (currentHourCuaca) {
        //     filteredCuaca = currentHourCuaca;
        //   }
        // }
        filteredCuaca = todayCuaca;
        setCuaca(filteredCuaca);
      }

      setCuaca(filteredCuaca);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        notify(err.message, 'error');
      }
    }
  };

  const handleGetRevNotif = async () => {
    try {
      const notif = await getRevisionNotif(token);
      setSumRevNotif(notif.data);
    } catch (err: any) {
      notify(err.response.data.message, 'error');
    }
  };

  const handleGetCheckNotif = async () => {
    try {
      const notif = await getCheckNotif(token);
      setSumCheNotif(notif.data);
    } catch (err: any) {
      notify(err.response.data.message, 'error');
    }
  };

  const handleTranslate = (word: any) => {
    const translatedWord = translateToIndonesian(word);
    return translatedWord;
  };



  const handleIcon = (status: any) => {
    switch (status) {
      case 'cloudy':
        return (
          <svg
            width={20}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" />
          </svg>
        );
      case 'clear-night':
        return (
          <svg
            width={23}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg>
        );
      case 'clear-day':
        return (
          <svg
            width={23}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
          </svg>
        );
      case 'partly-cloudy-night':
        return (
          <svg
            width={23}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M495.8 0c5.5 0 10.9 .2 16.3 .7c7 .6 12.8 5.7 14.3 12.5s-1.6 13.9-7.7 17.3c-44.4 25.2-74.4 73-74.4 127.8c0 81 65.5 146.6 146.2 146.6c8.6 0 17-.7 25.1-2.1c6.9-1.2 13.8 2.2 17 8.5s1.9 13.8-3.1 18.7c-34.5 33.6-81.7 54.4-133.6 54.4c-9.3 0-18.4-.7-27.4-1.9c-11.2-22.6-29.8-40.9-52.6-51.7c-2.7-58.5-50.3-105.3-109.2-106.7c-1.7-10.4-2.6-21-2.6-31.8C304 86.1 389.8 0 495.8 0zM447.9 431.9c0 44.2-35.8 80-80 80H96c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z" />
          </svg>
        );
      case 'partly-cloudy-day':
        return (
          <svg
            width={23}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5 55c-2.2-.1-4.4-.2-6.7-.2c-23.3 0-45.1 6.2-64 17.1l0-1.1c0-53-43-96-96-96s-96 43-96 96s43 96 96 96c8.1 0 15.9-1 23.4-2.9c-36.6 18.1-63.3 53.1-69.8 94.9l-24.4 17c-4.5 3.1-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM144 208a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM639.9 431.9c0 44.2-35.8 80-80 80H288c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z" />
          </svg>
        );
      case 'clock':
        return (
          <svg
            width={23}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>
        );
      default:
        return (
          <svg
            width={23}
            height={23}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
        );
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5">
        <div className="bg-gradient-to-br from-[#FDEDC9] via-[#FFD38E] to-[#F8BA39] rounded-xl shadow-md p-5 flex grid grid-cols-2">
          <div className="flex justify-center flex-col ml-5">
            <div className="flex flex-row gap-2 items-center">
              <h3 className="text-3xl font-semibold font-poppins text-[#C65200]">
                Welcome,
              </h3>
              <p className="font-bold font-poppins text-[#C65200] text-5xl">
                {nama}
              </p>
            </div>
            <p className="mt-2 text-xl font-medium text-[#C65200]">
              Selamat datang di Sistem Manajemen Design. Mari kita wujudkan
              ide-ide brilian menjadi karya yang menginspirasi!
            </p>
            {dataCuaca != null && dataCuaca.hours
              ? dataCuaca.hours.map((hour, index) => (
                  <div key={index}>
                    {hour.datetime === timeNow ? (
                      <div>
                        <div className="mt-5 flex flex-row items-center">
                          <div className="mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                              width={23}
                              height={23}
                              fill="#434357"
                            >
                              <path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z" />
                            </svg>
                          </div>
                          {/* {dataCuaca != null && dataCuaca.hours
                            ? dataCuaca.hours.map((hour, index) => ( */}
                          <p
                            // key={index}
                            className=" text-black font-semibold font-poppins text-4xl"
                          >
                            {hour.temp ? hour.temp : 'No data'}
                          </p>
                          {/* ))
                            : 'Kosong'} */}
                          <svg
                            className="top-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={10}
                            height={10}
                          >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                          </svg>
                          <p className="text-black font-semibold font-poppins text-4xl">
                            F
                          </p>

                          <p className="ml-2 text-black font-semibold">
                            {dataCuaca
                              ? handleTranslate(dataCuaca.description)
                              : ''}
                          </p>
                        </div>
                        <div className="mt-5 flex flex-row items-center">
                          <div className="mr-2">
                            {hour.icon ? handleIcon(hour.icon) : 'No data'}
                          </div>

                          <p className="ml-2 text-black font-poppins font-semibold text-xl">
                            {hour.conditions ? hour.conditions : 'No data'}
                          </p>
                        </div>
                        <div className="mt-5 flex flex-row items-center">
                          <div className="mr-2">{handleIcon('clock')}</div>

                          <p className="ml-2 text-black font-poppins font-semibold text-xl">
                            {time.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ))
              : ''}
          </div>
          <div className="flex justify-center w-full">
            <div className="flex justify-center items-center w-70 h-70">
              <div className="relative w-70 h-70">
                <img src="src/images/logo/Illustrations1.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 xl:flex-row w-full">
          {(sumRevNotif && sumRevNotif != null) ||
          (sumCheNotif && sumCheNotif != null) ? (
            <div className="w-full xl:w-1/2">
              <div className="flex flex-row  gap-5 w-full h-full animate-bounce">
                {sumRevNotif && sumRevNotif != null ? (
                  <div
                    className="w-full bg-white h-full rounded-xl shadow-md flex flex-col p-5  justify-between"
                    onClick={() => handleTo('/jobrevision')}
                  >
                    <div className="rounded-md bg-[#ff3434] flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="m-10"
                        width={50}
                        height={50}
                        fill="#fff1f1"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2 h-full justify-center">
                      <div className="font-poppins text-md font-semibold text-[#201650] flex justify-center">
                        Job Revision
                      </div>
                      <div className="flex flex-col justify-center text-center">
                        {' '}
                        <div className="flex justify-center flex-row gap-1">
                          <div className="text-[#201650]">Terdapat </div>
                          <p className="text-[#201650] font-poppins font-bold">
                            {sumRevNotif}
                          </p>{' '}
                        </div>
                        <div className="text-[#201650] flex justify-center">
                          revisi yang perlu dijadwalankan
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {sumCheNotif && sumCheNotif != null ? (
                  <div
                    className="w-full bg-white h-full rounded-xl shadow-md flex flex-col p-5 justify-between"
                    onClick={() => handleTo('/checkjob')}
                  >
                    <div className="flex flex-col gap-2 h-full justify-center">
                      <div className="font-poppins text-md font-semibold text-[#201650] flex justify-center">
                        Job Checking
                      </div>
                      <div className="flex flex-col justify-center text-center">
                        {' '}
                        <div className="flex justify-center flex-row gap-1">
                          <div className="text-[#201650]">Terdapat </div>
                          <p className="text-[#201650] font-poppins font-bold">
                            {sumCheNotif}
                          </p>{' '}
                        </div>
                        <div className="text-[#201650] flex justify-center">
                          pengecekan yang perlu dijadwalankan
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md bg-[#0add2d] flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="m-10"
                        width={50}
                        height={50}
                        fill="#eeffef"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="w-full xl:w-1/1">
            <div className="gap-5 grid grid-cols-2">
              <CardDataStats
                title={'Total Job'}
                total={
                  dataDash != null
                    ? dataDash !== undefined
                      ? dataDash.total_job?.toString() ?? '0'
                      : '0'
                    : '0'
                }
                note="Di Bulan Ini"
              ></CardDataStats>
              <CardDataStats
                title="Sudah Plotting"
                total={
                  dataDash != null
                    ? dataDash !== undefined
                      ? dataDash.sudah_plotting?.toString() ?? '0'
                      : '0'
                    : '0'
                }
                note="Di Bulan Ini"
              ></CardDataStats>
              <CardDataStats
                title="Sudah Diambil"
                total={
                  dataDash != null
                    ? dataDash !== undefined
                      ? dataDash.sudah_diambil?.toString() ?? '0'
                      : '0'
                    : '0'
                }
                note="Di Bulan Ini"
              ></CardDataStats>
              <CardDataStats
                title="Belum Diambil"
                total={
                  dataDash != null
                    ? dataDash !== undefined
                      ? dataDash.belum_diambil?.toString() ?? '0'
                      : '0'
                    : '0'
                }
                note="Di Bulan Ini"
              ></CardDataStats>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 xl:flex-row w-full">
          <div className="w-full xl:w-1/1 bg-white shadow-md  rounded-xl p-10 ">
            <p className="font-black text-xl text-poppins text-[#201650] mb-5">
              Top Designer
            </p>
            <div className="flex gap-5 flex-col justify-center w-full">
              {topDesignerData != null && topDesignerData.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
                  {topDesignerData.map((top: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-row gap-5 items-center"
                    >
                      <div
                        className={`w-13 h-13 rounded-full ${
                          index === 0
                            ? 'bg-[#FFC100]'
                            : index === 1
                            ? 'bg-[#C0C0C0]'
                            : index === 2
                            ? 'bg-[#FF6500]'
                            : 'bg-[#a6a6a6]'
                        } text-center flex items-center justify-center text-2xl font-bold font-poppins text-[#ECEFFF]`}
                      >
                        {index + 1}
                      </div>
                      <p className="text-2xl font-bold font-poppins text-[#201650]">
                        {top.designer_nama}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center text-center font-poppins text-xl text-[#201650]">
                  {' '}
                  Top Designer belum ada.
                </div>
              )}
            </div>
          </div>
          {/* <div className="w-full xl:w-1/2 bg-white shadow-md  rounded-xl p-10 ">
            <p className="font-black text-xl text-poppins text-[#201650] mb-5">
              Information
            </p>
            <div className="flex gap-5 flex-col justify-center w-full">
              <ListNotif />
            </div>
          </div> */}
        </div>
        <ChartKoor />

        <ToastContainer autoClose={3000} />
      </div>
    </DefaultLayout>
  );
};

export default DashboardKoor;
