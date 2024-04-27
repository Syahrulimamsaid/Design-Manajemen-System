import React, { useState, useRef } from 'react';
import { login } from '../../Helpers/API/AuthenticationsAPI';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { dotStream } from 'ldrs';
import Loader from '../../common/Loader';

const Login: React.FC<{ onNavigate: (to: string) => void }> = ({
  onNavigate,
}) => {
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setshowPass] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  dotStream.register();

  // const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(username, password);

      onNavigate('/');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
          confirmButtonText: 'Ok',
        }).then((res) => {
          if (res.isConfirmed) {
            setUsername('');
            setPassword('');
            setTimeout(() => {
              if (usernameRef.current) {
                usernameRef.current.focus();
              }
            }, 500);
          }
        });
      }
    }
  };

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-50 text-center">
              <span className="mt-15 inline-block">
                <img
                  src="src/images/icon/iconLogin.svg"
                  alt="iconLogin"
                  height="700"
                  width="700"
                />
              </span>
            </div>
          </div>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 justify-center">
              <div className="flex justify-center mb-15">
                <img
                  src="src/images/logo/logoPura.png"
                  height="400"
                  width="400"
                />
              </div>

              <form id="loginForm" onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="username"
                      placeholder="Enter your username"
                      className="w-full rounded-lg border border-stroke
                       bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                      value={username}
                      ref={usernameRef}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-15">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      required
                      placeholder="Enter your password with number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green-500 focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />

                    <span
                      className="absolute right-4 top-4"
                      onClick={() => setshowPass(!showPass)}
                    >
                      {showPass ? (
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="#071840"
                            d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="#071840"
                            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-5 flex justify-center items-center">
                  {loading ? (
                    <l-dot-stream
                      size="100"
                      speed="3"
                      color="green"
                    ></l-dot-stream>
                  ) : (
                    <input
                      type="submit"
                      value="Login"
                      className="w-full cursor-pointer rounded-lg border border-gray-300 h-14 bg-gradient-to-r from-[#28ff97] to-[#00cd61] p-4 text-slate-50 font-semibold text-xl transition hover:bg-opacity-90"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
