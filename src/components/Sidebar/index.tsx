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
import { SlUser } from 'react-icons/sl';
import { notify } from '../../Helpers/Notify/Notify';
import { lineWobble } from 'ldrs';

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
  lineWobble.register();
  const [loading, setLoading] = useState(true);
  // close on click outside
  useEffect(() => {
    setRole(localStorage.getItem('role'));
    handleGetIP();
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
    // if (role === '1') {
    //   handleGetRevNotif();
    // }
    return () => document.removeEventListener('click', clickHandler);
  });

  const [ipAddress, setIpAddress] = useState('');

  const handleGetIP = async () => {
    // setLoading(true);
    try {
      const ip = await fetch('https://api.ipify.org');
      const data = await ip.text();

      const segments = data.split('.');
      const segment3 = segments[2];

      // console.log(data);
      setIpAddress(segment3);
      setLoading(false);

      // const ip = await axios.get('https://ipapi.co/json');
      // console.log(ip.data.ip);

      // const ipv4Address = window.location.hostname;
      // console.log(ipv4Address);

      // const response = await axios.get('http://localhost:3000/api/data');
      // console.log(response);
    } catch (err: any) {
      notify(err.response.data.message, 'error');
      setLoading(false);
    }
  };

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
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gradient-to-bl from-[#6456fe] via-[#5537f4] to-[#492ad8] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src="src/images/logo/Logo Pura-01.png" alt="Logo" />
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
              {role === '1' ||
              role === '2' ||
              role === '3' ||
              role === '4' ||
              role === '5' ? (
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium ${
                    pathname === '/' || pathname.includes('dashboard')
                      ? 'text-[#ecefff]'
                      : 'text-[#ecefff]'
                  } duration-300 ease-in-out hover:bg-[#9da5ff] hover:text-[#ecefff] dark:hover:bg-meta-4 ${
                    (pathname === '/' || pathname.includes('dashboard')) &&
                    'bg-[#9da5ff] dark:bg-meta-4'
                  }`}
                >
                  <SlGrid size={19} />
                  Dashboard
                </NavLink>
              ) : (
                ''
              )}
              {role === '1' || role === '5' ? (
                <li>
                  <NavLink
                    to="/jobassignment"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/jobassignment')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff] hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/jobassignment') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlBriefcase size={20} />
                    Job Plotting
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' || role === '3' || role === '5' ? (
                <li>
                  <NavLink
                    to="/checkjob"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/checkjob')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/checkjob') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlCheck size={20} />
                    Job Checking
                  </NavLink>
                </li>
              ) : (
                ''
              )}{' '}
              {/* {role === '4' ? (
                <li>
                  <NavLink
                    to="/takejob"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/takejob')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#049 c9d]  hover:text-[#ecefff]  hover:text-[#ecefff] dark:hover:bg-meta-4 ${
                      pathname.includes('/takejob') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlBriefcase size={20} />
                    Ambil Pekerjaan
                  </NavLink>
                </li>
              ) : (
                ''
              )} */}
              {role === '4' || role === '5' ? (
                <li>
                  <NavLink
                    to="/listjob"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/listjob')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/listjob') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlList size={20} />
                    Job Designer
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '2' || role === '5' ? (
                <li>
                  <NavLink
                    to="/postingjob"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/postingjob')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/postingjob') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlPlus size={20} />
                    Job Posting
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '2' || role === '5' ? (
                <li>
                  <NavLink
                    to="/finallingjob"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/finallingjob')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/finallingjob') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlFlag size={20} />
                    Job Finalling
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' || role === '5' ? (
                <li>
                  <NavLink
                    // onClick={handleStatusNotif}
                    to="/jobrevision"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium  ${
                      pathname.includes('/jobrevision')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/jobrevision') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlClose size={20} />
                    Job Revision
                    {/* {statusNotif == true? (
                      <div className="absolute center-0 right-0 w-4 h-4 bg-red-500 rounded-full"></div>
                    ) : (
                      ''
                    )} */}
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' || role === '2' || role === '5' ? (
                <li>
                  <NavLink
                    to="/report"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/report')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/report') &&
                      'bg-[#9da5ff] dark:bg-meta-4'
                    }`}
                  >
                    <SlDoc size={20} />
                    Report
                  </NavLink>
                </li>
              ) : (
                ''
              )}
              {role === '1' || role === '3' || role === '4' || role === '5' ? (
                <li>
                  <NavLink
                    to="/timelines"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/timelines') ||
                      pathname.includes('/detailtimelines')
                        ? 'text-[#ecefff]'
                        : 'text-[#ecefff]'
                    } duration-300 ease-in-out hover:bg-[#9da5ff]  hover:text-[#ecefff]  dark:hover:bg-meta-4 ${
                      pathname.includes('/timelines') ||
                      pathname.includes('/detailtimelines')
                        ? 'bg-[#9da5ff] dark:bg-meta-4'
                        : ''
                    }`}
                  >
                    <SlClock size={20} />
                    Traceability
                  </NavLink>
                </li>
              ) : (
                ''
              )}{' '}
              {role === '5' ? (
                <li>
                  <NavLink
                    to="/user"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium ${
                      pathname.includes('/user')
                        ? 'text-slate-100'
                        : 'text-[#effefb]'
                    } duration-300 ease-in-out hover:bg-[#049c9d]  hover:text-slate-100  dark:hover:bg-meta-4 ${
                      pathname.includes('/user')
                        ? 'bg-[#049c9d] dark:bg-meta-4'
                        : ''
                    }`}
                  >
                    <SlUser size={20} />
                    User
                  </NavLink>
                </li>
              ) : (
                ''
              )}{' '}
            </ul>
          </div>
        </nav>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 items-bottom  flex justify-center py-10 flex-row gap-4 w-full ">
        {loading ? (
          <l-line-wobble
            size="80"
            stroke="5"
            bg-opacity="0.1"
            speed="1.75"
            color="#ecefff"
          ></l-line-wobble>
        ) : (
          <div className="flex justify-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="#effefb"
              width={25}
              height={25}
            >
              <path d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
            </svg>
            <p className="font-poppins font-bold text-[#effefb] text-xl">
              {ipAddress.length > 0
                ? ipAddress === '131'
                  ? 'Rotogravure 1'
                  : ipAddress === '28'
                  ? 'Rotogravure 2'
                  : ipAddress === '12'
                  ? 'MICS'
                  : ipAddress === '74'
                  ? 'Rumah Saya'
                  : 'Tidak Diketahui'
                : ''}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
