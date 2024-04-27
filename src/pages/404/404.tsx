import React, { useState, useRef } from 'react';
import { login } from '../../Helpers/API/AuthenticationsAPI';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { dotStream } from 'ldrs';
import Loader from '../../common/Loader';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col p-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-100 h-100"
      >
        <path
          fill="#00eb77"
          d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm240 80c0-8.8 7.2-16 16-16c45 0 85.6 20.5 115.7 53.1c6 6.5 5.6 16.6-.9 22.6s-16.6 5.6-22.6-.9c-25-27.1-57.4-42.9-92.3-42.9c-8.8 0-16-7.2-16-16zm-80 80c-26.5 0-48-21-48-47c0-20 28.6-60.4 41.6-77.7c3.2-4.4 9.6-4.4 12.8 0C179.6 308.6 208 349 208 369c0 26-21.5 47-48 47zM367.6 208a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm-192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
        />
      </svg>
      <div className="text-center mt-8">
        <h3 className="font-bold font-extrabold text-9xl">Page Not Found</h3>
      </div>
    </div>
  );
};

export default NotFound;