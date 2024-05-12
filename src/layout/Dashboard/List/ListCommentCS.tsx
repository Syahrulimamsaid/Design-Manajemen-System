import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../../Helpers/Notify/Notify';
import { dateFormatID } from '../../../Helpers/Date/FormatDate';
import { commentCustomer } from '../../../Helpers/API/DashboardAPI';
import LoaderTable from '../../LoaderTable/Loader';

const ListCommentCS = () => {
  const token = localStorage.getItem('token');
  const [commentCustomerData, setComment] = useState<JobAssignment[] | null>(
    null,
  );
  const[loading,setLoading]=useState(false);

  const handleComment = async () => {
    setLoading(true);
    try {
      const comment = await commentCustomer(token);
      setComment(comment.data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        notify(err.message, 'error');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    handleComment();
  }, []);

  return (
    <>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#DDE2FF] text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white xl:pl-11">
                  Kode
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                  Preparate
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                  Customer
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                  Tanggal Penolakan
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-[#201650] text-sm dark:text-white">
                  Komentar
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                    <tr>
                      <td colSpan={6} className='text-center'>
                        <LoaderTable />
                      </td>
                    </tr>
                  ) :commentCustomerData != null && commentCustomerData.length>0 ? (
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
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-[#201650] text-sm dark:text-white">
                        {dateFormatID(comment.qc.created_at)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-[#201650] text-sm dark:text-white font-bold">
                        {comment.qc.komentar}
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
                    Tidak ada penolakan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>  
    </>
  );
};

export default ListCommentCS;
