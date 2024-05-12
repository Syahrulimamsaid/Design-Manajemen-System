import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { getDashboard } from '../../Helpers/API/DashboardAPI';
import { notify } from '../../Helpers/Notify/Notify';

const Dashboard: React.FC = () => {
  interface DashboardData {
    job_assignment?: number;
    job_completed?: number;
    job_in_progress?: number;
    job_handled?: number;
    job_accepted?: number;
  }
  const [dataDash, setDataDash] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDataDash();
  }, []);

  const role = localStorage.getItem('role');

  const getDataDash = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await getDashboard(token);
      setDataDash(data.data);
    } catch (err) {
      if (err instanceof Error) {
       notify(err.message,'error');
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats
          title= {role ==='1'? "Penugasan" : role ==='2' ? 'Ditangani' : role==='3'? 'DiLoloskan':'Diambil'}
          total={
            dataDash != null
              ? dataDash !== undefined
                ? role === '1'
                  ? dataDash.job_assignment?.toString() ?? '0'
                  : role === '2'
                  ? dataDash.job_handled?.toString() ?? '0'
                  : role === '3' || role === '4'
                  ? dataDash.job_accepted?.toString() ?? '0'
                  : '0'
                : '0'
              : '0'
          }
          note="Di Bulan Ini"
        ></CardDataStats>
        <CardDataStats
          title="Pekerjaan Selesai"
          total={
            dataDash != null
              ? dataDash !== undefined
                ? dataDash.job_completed?.toString() ?? '0'
                : '0'
              : '0'
          }
          note="Di Bulan Ini"
        ></CardDataStats>
        <CardDataStats
          title="Pekerjaan Berlangsung"
          total={
            dataDash != null
              ? dataDash !== undefined
                ? dataDash.job_in_progress?.toString() ?? '0'
                : '0'
              : '0'
          }
          note="Di Bulan Ini"
        ></CardDataStats>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
