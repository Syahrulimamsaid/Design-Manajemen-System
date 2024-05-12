import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { notify } from '../../../Helpers/Notify/Notify';
import { detailAssignment, detailDesigner } from '../../../Helpers/API/DashboardAPI';
import { ToastContainer } from 'react-toastify';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#5537F4', '#ff1919'],
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
    strokeColors: ['#5537F4', '#ff1919'],
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

const ChartDesigner
: React.FC = () => {
  const [detailData, setDetail] = useState<any>({
    rata_pengerjaan: [],
    revisi: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const kode = localStorage.getItem('kode');
        const detail = await detailDesigner(token,kode);
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
        name: 'Rata Pengerjaan',
        data: detailData.rata_pengerjaan,
      },
      {
        name: 'Revisi',
        data: detailData.revisi,
      },
    ];

    setState({ series: seriesData });
  }, [detailData]);

  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap flex-col">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Activity
          </h4>
        </div>
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#5537F4]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#5537F4]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#5537F4]">Rata Pengerjaan</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#ff1919]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#ff1919]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#ff1919]">Revisi</p>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}
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

export default ChartDesigner
;
