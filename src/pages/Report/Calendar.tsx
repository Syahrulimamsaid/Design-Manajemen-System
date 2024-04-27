import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataCalendar } from '../../Helpers/API/Report/Report';
import { notify } from '../../Helpers/Notify/Notify';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { Scheduler, SchedulerData } from '@bitnoi.se/react-scheduler';
import Swal from 'sweetalert2';

const CalendarReport = () => {
  const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');
  // const userKode = localStorage.getItem('kode');
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState<SchedulerData>();

  const handlerGetData = async () => {
    setIsLoading(true);
    try {
      const calendar = await getDataCalendar(token);
      setCalendarData(calendar);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  useEffect(() => {
    handlerGetData();
  }, []);

  return (
    <>
      <div className="relative">
        <section className=" p-80">
          {calendarData != undefined && calendarData!.length > 0 ? (
            <Scheduler
              data={calendarData}
              isLoading={isLoading}
              onTileClick={(clickedResource) =>
                Swal.fire({
                  icon: 'info',
                  timer:2000,
                  title: `${clickedResource.title} || ${clickedResource.subtitle}`,
                  // titleText:`${clickedResource.startDate} - ${clickedResource.endDate}`,
                  text: clickedResource.description,
                  confirmButtonText: 'Tutup',
                })
              }
              onFilterData={() => {
                setFilterButtonState(1);
              }}
              onClearFilterData={() => {
                setFilterButtonState(0);
              }}
              config={{
                zoom: 1,
                includeTakenHoursOnWeekendsInDayView:true,
                showTooltip: true,
                filterButtonState,
              }}
            />
          ) : (
            ''
          )}
        </section>

        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};
export default CalendarReport;
