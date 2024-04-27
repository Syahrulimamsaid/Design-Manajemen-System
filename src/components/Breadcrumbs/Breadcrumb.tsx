import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-poppins font-bold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium font-poppins" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium font-poppins text-[#00eb77]">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
