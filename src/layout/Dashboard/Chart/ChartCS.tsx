import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { notify } from '../../../Helpers/Notify/Notify';
import { ToastContainer } from 'react-toastify';
import { detailJob } from '../../../Helpers/API/DashboardAPI';

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartCS: React.FC = () => {
  const [detailJobData, setDetail] = useState<any>({
    selesai: [],
    rejec_customer: [],
    acc_customer: [],
  });

  const [state, setState] = useState<ChartTwoState>({
    series: [],
  });
  const token = localStorage.getItem('token');
  const [month, setMonth] = useState<string>('1');

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  const handleDetailJob = async () => {
    try {
      const detail = await detailJob(token);
      setDetail(detail.data);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    const date = new Date();
    const result = date.getMonth()+1;
    setMonth(result.toString());
    handleDetailJob();
  }, []);

  useEffect(() => {
    const filterDataByMonth = (monthIndex: number) => {
      const index = monthIndex - 1;
      return {
        selesai: [detailJobData.selesai[index]],
        rejec_customer: [detailJobData.rejec_customer[index]],
        acc_customer: [detailJobData.acc_customer[index]],
      };
    };
    const filteredData = filterDataByMonth(parseInt(month));
    const seriesData = [
      {
        name: 'Selesai',
        data: filteredData.selesai,
      },
      {
        name: 'Reject Customer',
        data: filteredData.rejec_customer,
      },
      {
        name: 'Acc Customer',
        data: filteredData.acc_customer,
      },
    ];

    setState({ series: seriesData });
  }, [detailJobData, month]);

  const options: ApexOptions = {
    colors: [ '#1bbf26' ,'#ff7003','#5537F4'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (val: any) => Math.floor(val).toString(),
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: true,
    },

    xaxis: {
      categories: [
        month == '1'
          ? 'Januari'
          : month == '2'
          ? 'Februari'
          : month == '3'
          ? 'Maret'
          : month == '4'
          ? 'April'
          : month == '5'
          ? 'Mei'
          : month == '6'
          ? 'Juni'
          : month == '7'
          ? 'July'
          : month == '8'
          ? 'Agustus'
          : month == '8'
          ? 'September'
          : month == '10'
          ? 'Oktober'
          : month == '11'
          ? 'November'
          : month == '12'
          ? 'Desember'
          : '',
        // 'Jan',
        // 'Feb',
        // 'Mar',
        // 'Apr',
        // 'Mei',
        // 'Jun',
        // 'Jul',
        // 'Agu',
        // 'Sep',
        // 'Okt',
        // 'Nov',
        // 'Des',
      ],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Activity
          </h4>
        </div>
        <div className="relative z-20 inline-block">
          <select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
            className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
          >
            <option value="1" className="dark:bg-boxdark">
              Januari
            </option>
            <option value="2" className="dark:bg-boxdark">
              Februari
            </option>
            <option value="3" className="dark:bg-boxdark">
              Maret
            </option>
            <option value="4" className="dark:bg-boxdark">
              April
            </option>
            <option value="5" className="dark:bg-boxdark">
              Mei
            </option>
            <option value="6" className="dark:bg-boxdark">
              Juni
            </option>
            <option value="7" className="dark:bg-boxdark">
              July
            </option>
            <option value="8" className="dark:bg-boxdark">
              Agustus
            </option>
            <option value="9" className="dark:bg-boxdark">
              September
            </option>
            <option value="10" className="dark:bg-boxdark">
              Oktober
            </option>
            <option value="11" className="dark:bg-boxdark">
              November
            </option>
            <option value="12" className="dark:bg-boxdark">
              Desember
            </option>
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
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default ChartCS;
