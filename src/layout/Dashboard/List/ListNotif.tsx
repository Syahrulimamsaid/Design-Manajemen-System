import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../../Helpers/Notify/Notify';
import { dateFormatID } from '../../../Helpers/Date/FormatDate';
import { commentCustomer } from '../../../Helpers/API/DashboardAPI';
import { SlArrowRightCircle } from 'react-icons/sl';
import { getRevisionNotif } from '../../../Helpers/API/Job/Koor/Notif';
import { useNavigate } from 'react-router-dom';

const ListNotif = () => {
  const token = localStorage.getItem('token');
  const [sumNotif, setSumNotif] = useState(0);
  const navigate = useNavigate();


  const handleGetRevNotif = async () => {
    try {
      const notif = await getRevisionNotif(token);
      setSumNotif(notif.data);
    } catch (err: any) {
      notify(err.response.data.message, 'error');
    }
  };

  const handleTo=()=>{
    navigate('/jobrevision');
  };

  useEffect(() => {
    handleGetRevNotif();
  }, []);

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        {sumNotif && sumNotif > 0 ? (
          <div className="bg-[#f0f2ff] flex flex-row gap-5 rounded-md p-5 transition cursor-pointer hover:cursor-pointer" 
          onClick={handleTo}
          >
            <div className="w-full xl:w-1/2  text-md text-[#392c78] font-semibold">
              Penjadwalan Revisi
            </div>
            <div className="w-full xl:w-1/1 text-[#201650] text-md">
              Terdapat pekerjaan yang perlu penjadwalan revisi.
            </div>
            {/* <div className="w-full xl:w-2/6 text-right">
            {' '}
            <button className={`text-[#5537f4] hover:text-slate-900`}>
              <SlArrowRightCircle
                size={20}
                strokeWidth={25}
                // onClick={() =>

                // }
              />
            </button>
          </div> */}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-[#707070] font-nordmal text-md font-poppins">
             Tidak ada informasi untuk saat ini.
            </p>
          </div>
        )}
        {/* <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#DDE2FF] text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white xl:pl-11">
                  Judul
                </th>
                <th className="min-w-[550px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                  Isi
                </th>
                <th className="min-w-[50px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                  Tindakan
                </th>
               
              </tr>
            </thead>
            <tbody>
              {commentCustomerData != null && commentCustomerData ? (
                commentCustomerData?.map((comment, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className=" text-[#201650] text-sm dark:text-white">
                        {comment.kode}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-[#201650] text-sm dark:text-white">
                        {comment.job.nama}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-[#201650] text-sm dark:text-white">
                        {comment.job.perusahaan}
                      </p>
                    </td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-5 px-4 text-center dark:border-strokedark"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
      </div>
    </>
  );
};

export default ListNotif;
