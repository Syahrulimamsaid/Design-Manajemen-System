import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListReport from './List';
import GraphReport from './Graph';
import { useNavigate } from 'react-router-dom';
import CalendarReport from './Calendar';

const ReportDesigner = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedMount, setSelectedMount] = useState<string>('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const hanldeNavigate = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/graphlayout', {
      state: {
        type: selectedType,
        month: selectedMount,
      },
    });
  };

  useEffect(() => {
    setSelectedType('GRAPH');
    setSelectedMount('1');
  }, []);

  // const changeTextColor = () => {
  //   setIsMountSelected(true);
  // };

  // const exportChartToPDF = async () => {
  //   const chartElement = document.getElementById('report');

  //   if (chartElement) {
  //     const canvas = await html2canvas(chartElement);
  //     const imgData = canvas.toDataURL('image/png');

  //     const pdf = new jsPDF();
  //     pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
  //     pdf.save(
  //       `${selectedType === 'LIST' ? 'reportList.pdf' : 'reportGraph.pdf'}`,
  //     );
  //   }
  // };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Laporan Designer" />

        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <div className="w-full xl:w-1/2">
              <div className="items-center flex gap-10">
                <div className="bg-white rounded-md bg-white w-50 h-15 float-left hover:bg-slate-100 flex items-center justify-center shadow-md p-3 justify-between">
                  <select
                    value={selectedType}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                    }}
                    className={`w-full h-full relative appearance-none bg-transparent outline-none transition dark:bg-form-input text-slate-500 font-medium text-xl
             `}
                  >
                    <option
                      value="GRAPH"
                      className="text-body dark:text-bodydark"
                    >
                      Graph
                    </option>
                    <option
                      value="LIST"
                      className="text-body dark:text-bodydark"
                    >
                      List
                    </option>
                    <option
                      value="CALENDAR"
                      className="text-body dark:text-bodydark"
                    >
                      Calendar
                    </option>
                  </select>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </div>
                {selectedType != 'CALENDAR' ? (
                  <div className="bg-white rounded-md bg-white w-50 h-15 float-left hover:bg-slate-100 flex items-center justify-center shadow-md p-3 justify-between">
                    <select
                      value={selectedMount}
                      onChange={(e) => {
                        setSelectedMount(e.target.value);
                      }}
                      className={`w-full h-full relative appearance-none bg-transparent outline-none transition dark:bg-form-input text-slate-500 font-medium text-xl
             `}
                    >
                      <option
                        value="1"
                        className="text-body dark:text-bodydark"
                      >
                        Januari
                      </option>
                      <option
                        value="2"
                        className="text-body dark:text-bodydark"
                      >
                        Februari
                      </option>
                      <option
                        value="3"
                        className="text-body dark:text-bodydark"
                      >
                        Maret
                      </option>
                      <option
                        value="4"
                        className="text-body dark:text-bodydark"
                      >
                        April
                      </option>
                      <option
                        value="5"
                        className="text-body dark:text-bodydark"
                      >
                        Mei
                      </option>
                      <option
                        value="6"
                        className="text-body dark:text-bodydark"
                      >
                        Juni
                      </option>
                      <option
                        value="7"
                        className="text-body dark:text-bodydark"
                      >
                        Juli
                      </option>
                      <option
                        value="8"
                        className="text-body dark:text-bodydark"
                      >
                        Agustus
                      </option>
                      <option
                        value="9"
                        className="text-body dark:text-bodydark"
                      >
                        September
                      </option>
                      <option
                        value="10"
                        className="text-body dark:text-bodydark"
                      >
                        Oktober
                      </option>
                      <option
                        value="11"
                        className="text-body dark:text-bodydark"
                      >
                        November
                      </option>
                      <option
                        value="12"
                        className="text-body dark:text-bodydark"
                      >
                        Desember
                      </option>
                    </select>

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="w-full xl:w-1/2">
              {role != '2' ? (
                <div className="items-right">
                  <button
                    className="rounded-full bg-[#00eb77] w-50 h-15 float-right hover:bg-[#06da6c] flex items-center px-7 shadow-md"
                    onClick={hanldeNavigate}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width={35}
                      height={35}
                    >
                      <path
                        fill="#f0f0f0"
                        d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
                      />
                    </svg>
                    <p className="text-white font-bold text-xl ml-5">Simpan</p>
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div id="report">
            <div className="flex flex-col gap-10">
              <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                  <div className="m-2">
                    {selectedType === 'LIST' ? (
                      <ListReport month={selectedMount} />
                    ) : selectedType === 'GRAPH' ? (
                      <GraphReport monthSelect={selectedMount} />
                    ) : selectedType === 'CALENDAR' ? (
                      <CalendarReport />
                    ) : (
                      ''
                    )}
                  </div>
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

export default ReportDesigner;
