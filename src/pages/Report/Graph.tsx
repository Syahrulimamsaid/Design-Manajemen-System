import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getReport, getReportDesigner } from '../../Helpers/API/Report/Report';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { notify } from '../../Helpers/Notify/Notify';

export interface ListProps {
  monthSelect: string;
}

const GraphReport = (props: ListProps) => {
  const { monthSelect } = props;
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userKode = localStorage.getItem('kode');
  const [report, setReport] = useState<Report[] | null>(null);
  const valueFormatter = (value: number | null) => {
    if (value !== null) {
      return Math.round(value).toString();
    }
    return '';
  };

  const chartSetting = {
    // yAxis: [
    //   {
    //     label: 'Number',
    //   },
    // ],
    width: 1385,
    height: 600,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const handlerGetData = async () => {
    if (role == '1' || role == '2' || role == '3') {
      try {
        const response = await getReport(token);
        const filteredData = response.data[monthSelect].map((item: any) => ({
          designer_nama: item.designer_nama,
          revisi: item.revisi,
          selesai: item.selesai,
          belum_selesai: item.belum_selesai,
          tidak_diambil: item.tidak_diambil,
          rata_pengerjaan: item.rata_pengerjaan,
        }));
        setReport(filteredData);
      } catch (err) {
        if (err instanceof Error) {
          notify(err.message, 'error');
        }
      }
    } else {
      try {
        const response = await getReportDesigner(token, userKode);
        const filteredData = response.data[monthSelect].map((item: any) => ({
          designer_nama: item.designer_nama,
          revisi: item.revisi,
          selesai: item.selesai,
          belum_selesai: item.belum_selesai,
          tidak_diambil: item.tidak_diambil,
          rata_pengerjaan: item.rata_pengerjaan,
        }));
        setReport(filteredData);
      } catch (err) {
        if (err instanceof Error) {
          notify(err.message, 'error');
        }
      }
    }
  };

  useEffect(() => {
    handlerGetData();
  }, [monthSelect]);

  const convertToDataset = (report: Report[]) => {
    return report.map((item) => ({
      designer_nama: item.designer_nama,
      revisi: item.revisi,
      selesai: item.selesai,
      belum_selesai: item.belum_selesai,
      tidak_diambil: item.tidak_diambil,
      rata_pengerjaan: item.rata_pengerjaan,
    }));
  };

  return (
    <>
      {report && (
        <BarChart
          dataset={convertToDataset(report)}
          xAxis={[{ scaleType: 'band', dataKey: 'designer_nama' }]}
          series={[
            { dataKey: 'revisi', label: 'Revisi', valueFormatter },
            { dataKey: 'selesai', label: 'selesai', valueFormatter },
            {
              dataKey: 'belum_selesai',
              label: 'Belum Selesai',
              valueFormatter,
            },
            {
              dataKey: 'tidak_diambil',
              label: 'Tidak Diambil',
              valueFormatter,
            },
            {
              dataKey: 'rata_pengerjaan',
              label: 'Rata Rata Pengerjaan',
              valueFormatter,
            },
          ]}
          colors={['#FF5733', '#33FF57', '#3357FF', '#FF33E4', '#33FFE1']}
          {...chartSetting}
        />
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default GraphReport;
