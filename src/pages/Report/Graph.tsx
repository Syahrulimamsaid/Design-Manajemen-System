import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getReport, getReportDesigner } from '../../Helpers/API/Report/Report';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { notify } from '../../Helpers/Notify/Notify';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { SlInfo, SlQuestion } from 'react-icons/sl';

export interface ListProps {
  monthSelect: string;
  // designer: string;
  designer: string[];
}

const GraphReport = (props: ListProps) => {
  const { monthSelect, designer } = props;
  const token = localStorage.getItem('token');
  const [report, setReport] = useState<[] | null>(null);

  const { pathname } = location;

  const [widht, setWidth] = useState(1350);

  const handlerGetData = async () => {
    try {
      const response = await getReport(token);

      const filteredData = response.data[monthSelect].map((item: any) => ({
        designer: item.designer,
        designer_nama: item.designer_nama,
        belum_diambil: item.belum_diambil,
        selesai: item.selesai,
        on_progress: item.on_progress,
        acc: item.acc,
        revisi: item.revisi,
      }));

      let filterDesigner = filteredData;
      if (designer) {
        filterDesigner = filteredData.filter((item: any) =>
          designer.includes(item.designer),
        );
      }
      // console.log(filterDesigner);
      setReport(filterDesigner);
      // setReport(filteredData);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    handlerGetData();
    // if (window.matchMedia) {
    //   const mediaQueryList = window.matchMedia('print');
    //   if (mediaQueryList.matches) {
    //     // Kertas dicetak
    //     set(400);
    //   }
    // }

    if (pathname.includes('/printlayout')) {
      setWidth(1000);
    } else {
      setWidth(1350);
    }
  }, [monthSelect, designer]);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 335,
      // height: chartHeight,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '';
        },
      },
    },
    xaxis: {
      categories: report ? report.map((item) => item.designer_nama) : [],
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: (val: any) => Math.floor(val).toString(),
      },
    },
  };

  const seriesData =
    report && Array.isArray(report) && report.length > 0
      ? [
          {
            name: 'Belum Diambil',
            data: report.map((item) => item.belum_diambil),
          },
          {
            name: 'Selesai',
            data: report.map((item) => item.selesai),
          },
          {
            name: 'On Progress',
            data: report.map((item) => item.on_progress),
          },
          {
            name: 'Revisi',
            data: report.map((item) => item.revisi),
          },
          {
            name: 'Acc',
            data: report.map((item) => item.acc),
          },
        ]
      : [];

  return (
    <div className="transition duration-300 ease-in">
      {designer.length > 0 ? (
        <ReactApexChart
          options={chartOptions}
          series={seriesData}
          type="bar"
          height={600}
          width={widht}
        />
      ) : (
        <div className="items-center flex justif-center gap-5 mb-6">
          <SlInfo size={25} strokeWidth={20} color="#3b25ae" />
          <p className="text-[#707070] font-nordmal text-md font-poppins">
            Silahkan pilih designer yang ingin ditampilkan.
          </p>
        </div>
      )}
    </div>
  );
};

export default GraphReport;
