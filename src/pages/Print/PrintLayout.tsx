import  { useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarReport from '../Report/Calendar';
import GraphReport from '../Report/Graph';
import CardReport from '../Report/Card';
import ListReport from '../Report/List';

const PrintLayout = () => {
  const location = useLocation();
  const { type } = location.state || {};
  const { month } = location.state || {};
  const { designer } = location.state || {};
  const { designers } = location.state || {};

  // const [type,setType]=useState('');
  // const [month,setMonth]=useState('');

  // const  type, setSelectedType] = useState('');
  // const [selectedMonth, setSelectedMonth] = useState('');
  // const [countReport, setCountReport] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      window.print();

      window.addEventListener('afterprint', handleAfterPrint);

      return () => {
        window.removeEventListener('afterprint', handleAfterPrint);
      };
    }, 2500);

  }, []);

  const handleAfterPrint = () => {
    navigate('/report');
  };

  // const exportChartToPDF = async () => {
  //   if (countReport === 0) {
  //     setCountReport(countReport + 1);
  //     const chartElement = document.getElementById('report');
  //     const now = new Date(Date.now());

  //     if (chartElement) {
  //       const canvas = await html2canvas(chartElement);
  //       const imgData = canvas.toDataURL('image/png');

  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);

  //       await new Promise((resolve) => {
  //         pdf
  //           .save(
  //             `${
  //               type === 'LIST'
  //                 ? `reportList${getMonthName(parseInt(month))}%${now}.pdf`
  //                 : type === 'CALENDAR'
  //                 ? `reportCalendar${getMonthName(parseInt(month))}%${now}.pdf`
  //                 : `reportGraph${getMonthName(parseInt(month))}%${now}.pdf`
  //             }`,
  //             { returnPromise: true },
  //           )
  //           .then(resolve);
  //       });
  //     }
  //   }
  // };

  function getMonthName(monthNumber: number) {
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    return monthNames[monthNumber - 1];
  }

  return (
    <div className="p-5">
      <div
        className="rounded-sm border border-stroke bg-white
    shadow-default"
      >
        <div id="report" className="w-full h-full">
          <div className="p-15 flex flex-col gap-3">
            <div className="flex xl:flex-row items-center justify-between">
              <div className="w-full xl:w-1/2">
                <img
                  src="src/images/logo/logoPura.png"
                  alt="Logo Pura"
                  height={100}
                  width={220}
                />
              </div>
              <div className="w-full xl:w-1/1 flex justify-start">
                <div className="text-center ">
                  <p className="mb-1 text-black font-medium font-poppins text-xl">
                    PT Pura Barutama Rotogravure 1
                  </p>
                  <p className="mb-1 text-black font-bold font-poppins text-xl">
                    Laporan Performa Designer
                  </p>
                  <p className="text-black font-medium font-poppins text-xl">
                    Periode{' '}
                    {`${getMonthName(
                      parseInt(month),
                    )} ${new Date().getFullYear()}`}
                  </p>
                </div>
              </div>
              <div className="w-90"></div>
            </div>

            <div>
              <hr style={{ border: '1px solid black', margin: '20px 0' }} />
            </div>
            <div className="flex justify-center items-center text-center ">
              {type === 'LIST' ? (
                <ListReport month={month} />
              ) : type === 'GRAPH' ? (
                <div className="max-w-full overflow-x-auto">
                  <div className="m-2 transition duration-300 ease-in">
                    <GraphReport monthSelect={month} designer={designers} />
                  </div>
                </div>
              ) : type === 'CALENDAR' ? (
                <CalendarReport designer={designer} />
              ) : type === 'CARD' ? (
                <CardReport month={month} />
              ) : (
                <p>No report type selected.</p>
              )}
            </div>

            <ToastContainer autoClose={3000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintLayout;
