import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../../Helpers/Notify/Notify';
import { dateFormatID } from '../../../Helpers/Date/FormatDate';
import { commentCustomer, commentQC } from '../../../Helpers/API/DashboardAPI';
import LoaderTable from '../../LoaderTable/Loader';

const ListCommentQC = () => {
  const token = localStorage.getItem('token');
  const [commentQCData, setComment] = useState<QualityControl[] | null>(
    null,
  );

  const [loading,setLoading]=useState(false);

  const handleComment = async () => {
    setLoading(true);
    try {
      const comment = await commentQC(token);
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
                  ) :commentQCData != null && commentQCData.length> 0 ? (
              commentQCData?.map((comment, index) => (
                comment.komentar != null && comment.komentar != null?
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className=" text-[#201650] text-sm dark:text-white">
                      {comment.job_assignment.job.kode}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-[#201650] text-sm dark:text-white">
                      {comment.job_assignment.job.nama}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-[#201650] text-sm dark:text-white">
                      {dateFormatID(comment.created_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-[#201650] text-sm dark:text-white font-bold">
                      {comment.komentar}
                    </p>
                  </td>
                </tr> : <tr>
                <td
                  colSpan={6}
                  className="py-5 px-4 text-center dark:border-strokedark"
                >
                 Tidak ada data komentar.
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-5 px-4 text-center dark:border-strokedark"
                >
                Tidak ada data komentar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListCommentQC;
