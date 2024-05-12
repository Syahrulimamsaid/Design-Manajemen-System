import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataCalendar } from '../../Helpers/API/Report/Report';
import { notify } from '../../Helpers/Notify/Notify';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { Scheduler, SchedulerData } from '@bitnoi.se/react-scheduler';
import Swal from 'sweetalert2';
import { SlInfo } from 'react-icons/sl';

interface CalendarProps {
  designer: string;
  // job: string;
}
const CalendarReport = (props: CalendarProps) => {
  const { designer } = props;
  const token = localStorage.getItem('token');
  // const role = localStorage.getItem('role');
  // const userKode = localStorage.getItem('kode');
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState<SchedulerData>();

  const handlerGetData = async () => {
    setIsLoading(true);
    try {
      console.log(designer);
      const calendar = await getDataCalendar(token, designer);

      // let filterDesigner = calendar;
      // if (designer) {
      //   filterDesigner = calendar.filter((item: any) =>
      //     designer.includes(item.id),
      //   );
      // }

      setCalendarData(calendar);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
    }
  };

  const handleTextIcon = (text: any) => {
    if (
      text == 'Tidak Lolos QC' ||
      text == 'Tidak Lolos Koordinator' ||
      text == 'Pekerjaan ditolak Customer' ||
      /Pengumpulan\sRevisi/.test(text) ||
      /Penjadwalan\sRevisi/.test(text)
    ) {
      return 'error';
    } else if (
      text == 'Lolos QC' ||
      text == 'Lolos Koordinator' ||
      text == 'Pekerjaan diterima Customer' ||
      text == 'Waktu Pengerjaan'
    ) {
      return 'success';
    }
  };

  useEffect(() => {
    designer ? handlerGetData() : '';
  }, [designer]);

  return (
    <>
      {designer != null && designer.length > 0 ? (
        <div className="relative w-full h-full">
          <section className="pt-150 h-full w-full ">
            {calendarData != undefined && calendarData!.length > 0 ? (
              <Scheduler
                data={calendarData}
                isLoading={isLoading}
                onTileClick={(clickedResource) =>
                  Swal.fire({
                    icon: handleTextIcon(clickedResource.title),
                    timer: 2000,
                    title: `${clickedResource.title} || ${clickedResource.subtitle}`,
                    // titleText:`${clickedResource.startDate} - ${clickedResource.endDate}`,
                    text: clickedResource.description,
                    confirmButtonText: 'Close',
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
                  includeTakenHoursOnWeekendsInDayView: true,
                  showTooltip: true,
                  filterButtonState,
                }}
              />
            ) : (
              ''
            )}
          </section>

          <ToastContainer autoClose={5000} />
        </div>
      ) : (
        <div className="items-center flex justif-center gap-5 mb-6">
          <SlInfo size={25} strokeWidth={20} color="#3b25ae" />
          <p className="text-[#707070] font-nordmal text-md font-poppins">
            Silahkan pilih designer ingin ditampilkan.
          </p>
        </div>
      )}
    </>
  );
};
export default CalendarReport;
