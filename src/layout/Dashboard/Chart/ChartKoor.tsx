import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { notify } from '../../../Helpers/Notify/Notify';
import { detailAssignment } from '../../../Helpers/API/DashboardAPI';
import { ToastContainer } from 'react-toastify';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#5537F4', '#1bbf26', '#ff7003'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#5537F4', '#1bbf26', '#ff7003'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 20,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartKoor: React.FC = () => {
  const [detailData, setDetail] = useState<any>({
    penjadwalan_revisi: [],
    pengecekan: [],
    penolakan: [],
  });
  
  const [month,setMonth]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const detail = await detailAssignment(token);
        if (detail && detail.data) {
          setDetail(detail.data);
        }
      } catch (err) {
        if (err instanceof Error) {
          notify(err.message, 'error');
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const seriesData = [
      {
        name: 'Penjadwalan Revisi',
        data: detailData.penjadwalan_revisi,
      },
      {
        name: 'Pengecekan',
        data: detailData.pengecekan,
      },
      {
        name: 'Penolakan',
        data: detailData.penolakan,
      },
    ];

    setState({ series: seriesData });
  }, [detailData]);

  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Activity
          </h4>
        </div>
        <div className='w-full flex flex-row'>
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#5537F4]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#5537F4]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#5537F4]">Penjadwalan Revisi</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#1bbf26]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#1bbf26]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#1bbf26]">Pengecekan</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#ff7003]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#ff7003]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#ff7003]">Penolakan</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          {/* <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div> */}
          {/* <div className="relative z-20 inline-block">
            <select
              value={month}
              onChange={(e)=>{
                setMonth(e.target.value)
              }}
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="1" className='dark:bg-boxdark'>Januari</option>
              <option value="2" className='dark:bg-boxdark'>Februari</option>
              <option value="3" className='dark:bg-boxdark'>Maret</option>
              <option value="4" className='dark:bg-boxdark'>April</option>
              <option value="5" className='dark:bg-boxdark'>Mei</option>
              <option value="6" className='dark:bg-boxdark'>Juni</option>
              <option value="7" className='dark:bg-boxdark'>July</option>
              <option value="8" className='dark:bg-boxdark'>Agustus</option>
              <option value="9" className='dark:bg-boxdark'>September</option>
              <option value="10" className='dark:bg-boxdark'>Oktober</option>
              <option value="11" className='dark:bg-boxdark'>November</option>
              <option value="12" className='dark:bg-boxdark'>Desember</option>
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div> */}
        </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default ChartKoor;
