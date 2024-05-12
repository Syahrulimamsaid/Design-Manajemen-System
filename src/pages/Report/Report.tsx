import React, { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CalendarReport from './Calendar';
import { getDesigner } from '../../Helpers/API/Designer/Designer';
import { notify } from '../../Helpers/Notify/Notify';
import { jobOnProgress } from '../../Helpers/API/Job/Koor/JobAssignment';
import CardReport from './Card';
import ListReport from './List';
import GraphReport from './Graph';
import MultiSelect from '../../layout/MultiSelect';

interface Option {
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
}

const ReportDesigner = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedMount, setSelectedMount] = useState<string>('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const [getDataDesigner, setDataDesigner] = useState<User[] | null>(null);
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [status, setStatus] = useState(false);
  const [a, setA] = useState(false);
  const [designer, setDesigner] = useState<string[]>([]);

  const hanldeNavigate = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/printlayout', {
      state: {
        type: selectedType,
        month: selectedMount,
        designer: selectedDesigner,
        designers: designer,
      },
    });
  };

  useEffect(() => {
    if (a === false) {
      handleGetDesigner();
      const date = new Date(Date.now());
      const selectedMonth = (date.getMonth() + 1).toString();

      setSelectedType('GRAPH');
      setSelectedMount(selectedMonth);
      setA(true);
    } else {
      handleView();
    }
  }, ['id', selectedType, selectedDesigner,designer]);

  const handleGetDesigner = async () => {
    try {
      const data = await getDesigner(token);
      setDataDesigner(data);

    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };


  const handleSelectDesigner = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedDesigner != e.target.value) {
    }
    const selectedValue = e.target.value;
    setSelectedDesigner(selectedValue);

  };

  const handleView = () => {
    if (selectedType === 'GRAPH') {
      designer.length > 0 && selectedMount != null
        ? setStatus(true)
        : setStatus(false);
    } else if (selectedType === 'LIST') {
      setStatus(true);
    } else if (selectedType === 'CARD') {
      setStatus(true);
    } else if (selectedType === 'CALENDAR') {
      selectedDesigner.length > 0 ? setStatus(true) : setStatus(false);
    } else {
      setStatus(false);
    }
  };

  const handleSetDesigner = (designer: string[]) => {
    setDesigner(designer);
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Report" />

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
                    className={`w-full h-full relative appearance-none bg-transparent outline-none transition dark:bg-form-input text-slate-500 font-medium text-xl hover:text-[#5537f4]
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
                      value="CARD"
                      className="text-body dark:text-bodydark"
                    >
                      Card
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
                      className={`w-full h-full relative appearance-none bg-transparent outline-none transition dark:bg-form-input text-slate-500 font-medium text-xl hover:text-[#5537f4]
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
                status === true ? (
                  <div className="items-right">
                    <button
                      className="rounded-full bg-[#492ad8] w-50 h-15 float-right hover:bg-[#6456fe] flex items-center px-7 shadow-md flex justify-center"
                      onClick={hanldeNavigate}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width={35}
                        height={35}
                      >
                        <path
                          fill="#ecefff"
                          d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
                        />
                      </svg>
                      <p className="text-[#ecefff] font-bold text-xl ml-5">
                        Save
                      </p>
                    </button>
                  </div>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </div>
          </div>
          {selectedType === 'GRAPH' ? (
            <div className="bg-white shadow-md p-5 rounded-md">
              <MultiSelect
                id="multiselect"
                selectDesigner={handleSetDesigner}
              />
            </div>
          ) : selectedType === 'CALENDAR' ? (
            <div className=" w-full">
              <div className="bg-white shadow-md p-5 rounded-md">
                <div className="relative z-50 ">
                  <label className="mb-3 block text-sm font-medium font-poppins text-[#201650] dark:text-white">
                    Pilih Designer
                  </label>
                  <div>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        value={selectedDesigner}
                        onChange={(e) => {
                          handleSelectDesigner(e);
                        }}
                        className={`relative z-20 w-full text-[#201650] font-medium appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-[#7776ff]  active:border-[#7776ff] hover:border-[#7776ff]  dark:border-form-strokedark dark:bg-form-input`}
                      >
                        <option
                          value=""
                          disabled
                          className="text-body dark:text-bodydark"
                        >
                          Pilih Designer
                        </option>

                        {getDataDesigner?.map((designer, index) => (
                          <option
                            key={index}
                            value={designer.kode}
                            className="text-body dark:text-bodydark"
                          >
                            {designer.nama}
                          </option>
                        ))}
                      </select>

                      <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
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
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <div id="report">
            {selectedType === 'CARD' ? (
              <CardReport month={selectedMount} />
            ) : selectedType === 'LIST' ? (
              <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <div className="max-w-full overflow-x-auto">
                    <ListReport month={selectedMount} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {selectedType === 'CALENDAR' && selectedDesigner.length > 0 ? (
                  <div className="bg-white flex justify-center items-center shadow-md ">
                    <div className=" p-7 grid grid-cols-4 gap-4 w-full ">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#0ee34e] rounded-full"></div>
                        <p className="font-medium">Pengerjaan</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#0ed1e3] rounded-full"></div>
                        <p className="font-medium">Lolos QC</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#bfe30e] rounded-full"></div>
                        <p className="font-medium">Tidak Lolos QC</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#0e55e3] rounded-full"></div>
                        <p className="font-medium">Lolos Koordinator</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#7d400a] rounded-full"></div>
                        <p className="font-medium">Tidak Lolos Koordinator</p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#e30edf] rounded-full"></div>
                        <p className="font-medium">
                          Pekerjaan diterima Customer
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#f23b2e] rounded-full"></div>
                        <p className="font-medium">
                          Pekerjaan ditolak Customer
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="w-5 h-5 bg-[#f26c2e] rounded-full"></div>
                        <p className="font-medium">Revisi</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <div className="flex flex-col gap-10">
                  <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                      <div className="m-2 transition duration-300 ease-in flex justify-center">
                        {selectedType === 'GRAPH' ? (
                          <GraphReport
                            monthSelect={selectedMount}
                            // designer={selectedDesigners}
                            designer={designer}
                          />
                        ) : selectedType === 'CALENDAR' ? (
                          <CalendarReport designer={selectedDesigner} />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ToastContainer autoClose={3000} />
      </DefaultLayout>
    </>
  );
};

export default ReportDesigner;
