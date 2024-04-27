import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SlBriefcase } from 'react-icons/sl';
import { SlCheck } from 'react-icons/sl';
import { SlClose } from 'react-icons/sl';
import { SlPlus } from 'react-icons/sl';
import { SlDoc } from 'react-icons/sl';
import { SlGrid } from 'react-icons/sl';
import { SlClock } from 'react-icons/sl';
import { SlFlag } from 'react-icons/sl';
import { SlList } from 'react-icons/sl';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  const [role, setRole] = useState<string | null>(null);

  // close on click outside
  useEffect(() => {
    setRole(localStorage.getItem('role'));
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#ebfaf9] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src="src/images/logo/logoPura.png" alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {role === '1' || role === '2' || role === '3' || role === '4' ? (
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium ${
                    pathname === '/' || pathname.includes('dashboard')
                      ? 'text-slate-100'
                      : 'text-[#dcdcdc]'
                  } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                    (pathname === '/' || pathname.includes('dashboard')) &&
                    'bg-[#00eb77] dark:bg-meta-4'
                  }`}
                >
                  <SlGrid size={19} />
                  Dashboard
                </NavLink>
              ) : (
                ''
              )}
              {role === '1' ? (
                <li>
                  <NavLink
                    to="/jobassignment"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/jobassignment')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/jobassignment') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlBriefcase size={20} />
                    Penugasan
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' || role === '3' ? (
                <li>
                  <NavLink
                    to="/checkjob"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/checkjob')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/checkjob') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlCheck size={20} />
                    Pengecekan
                  </NavLink>
                </li>
              ) : (
                ''
              )}{' '}
              {role === '4' ? (
                <li>
                  <NavLink
                    to="/takejob"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/takejob')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/takejob') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlBriefcase size={20} />
                    Ambil Pekerjaan
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '4' ? (
                <li>
                  <NavLink
                    to="/listjob"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/listjob')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/listjob') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlList size={20} />
                    Daftar Pekerjaan
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '2' ? (
                <li>
                  <NavLink
                    to="/postingjob"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/postingjob')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/postingjob') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlPlus size={20} />
                    Posting Pekerjaan
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '2' ? (
                <li>
                  <NavLink
                    to="/finallingjob"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/finallingjob')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/finallingjob') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlFlag size={20} />
                    Penyelesaian Pekerjaan
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' ? (
                <li>
                  <NavLink
                    to="/jobrevision"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium  ${
                      pathname.includes('/jobrevision')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/jobrevision') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlClose size={20} />
                    Revisi
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' || role === '2' ? (
                <li>
                  <NavLink
                    to="/report"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/report')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/report') &&
                      'bg-[#00eb77] dark:bg-meta-4'
                    }`}
                  >
                    <SlDoc size={20} />
                    Laporan Designer
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' ||role === '3' || role === '4' ? (
                <li>
                  <NavLink
                    to="/timelines"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium ${
                      pathname.includes('/timelines') ||
                      pathname.includes('/detailtimelines')
                        ? 'text-slate-100'
                        : 'text-[#dcdcdc]'
                    } duration-300 ease-in-out hover:bg-[#00eb77] dark:hover:bg-meta-4 ${
                      pathname.includes('/timelines') ||
                      pathname.includes('/detailtimelines')
                        ? 'bg-[#00eb77] dark:bg-meta-4'
                        : ''
                    }`}
                  >
                    <SlClock size={20} />
                    Garis Waktu
                  </NavLink>
                </li>
              ) : (
                ''
              )}{' '}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
