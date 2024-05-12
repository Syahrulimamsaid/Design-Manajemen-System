import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  note: string;
  // levelUp?: boolean;
  // levelDown?: boolean;
  children?: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  // note,
  // // levelUp,
  // // levelDown,
  // children,
}) => {
  const handleIcon = (icon: String) => {
    switch (icon) {
      case 'Total Job':
        return (
          <svg
            width={40}
            height={40}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="m-10"
            fill="#5537F4"
          >
            <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" />
          </svg>
        );
      case 'Sudah Plotting':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
          </svg>
        );
      case 'Sudah Diambil':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z" />
          </svg>
        );
      case 'Belum Diambil':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M96 32C96 14.3 81.7 0 64 0S32 14.3 32 32V96v59.1 .7V192v21.9c0 14.2 5.1 27.9 14.3 38.7L131.6 352H128c-13.3 0-24 10.7-24 24s10.7 24 24 24h32H288h64H480h32c13.3 0 24-10.7 24-24s-10.7-24-24-24h-3.6l85.3-99.5c9.2-10.8 14.3-24.5 14.3-38.7V192 155.8v-.7V96 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V96v48.8l-69.3 92.4c-5.7 7.6-16.1 9.6-24.2 4.8c-9.7-5.7-12.1-18.7-5.1-27.5L473 180c10.8-13.5 8.9-33.3-4.4-44.5s-33-9.8-44.5 3.2l-46.7 52.5C361 209.7 352 233.4 352 258.1V320v32H288V320 258.1c0-24.6-9-48.4-25.4-66.8l-46.7-52.5c-11.5-13-31.3-14.4-44.5-3.2s-15.2 30.9-4.4 44.5l27.6 34.5c7 8.8 4.7 21.8-5.1 27.5c-8.1 4.8-18.6 2.7-24.2-4.8L96 144.8V96 32zm64 448v32H288V480h64v32H480V480h32c13.3 0 24-10.7 24-24s-10.7-24-24-24H480 352 288 160 128c-13.3 0-24 10.7-24 24s10.7 24 24 24h32z" />
          </svg>
        );
      case 'Sedang Dikerjakan':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
          </svg>
        );

      case 'Belum Dikerjakan':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM105.8 229.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L216 328.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V314.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H158.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM160 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        );
      case 'Acc':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        );
      case 'Reject':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        );
      case 'Belum Dicek':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        );
      case 'Selesai':
        return (
          <svg
            width={40}
            height={40}
            className="m-10"
            fill="#5537F4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
          </svg>
        );
    }
  };
  return (
    <div className="flex  rounded-xl border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-row p-4 gap-5">
        {' '}
        <div className="bg-[#ECEFFF] rounded-xl">{handleIcon(title)}</div>
        <div className="flex flex-col justify-center">
          {' '}
          <p className="text-3xl font-poppins font-bold text-[#392c78]">
            {total}
          </p>{' '}
          <p className="text-xl font-poppins font-semibold text-[#aaa8b3]">
            {title}
          </p>{' '}
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center text-center space-y-10"> */}
      {/* <h4 className="text-3xl font-black text-black dark:text-white">
          {title}
        </h4>
        <span className="text-8xl font-black text-[#00c45e]">{total}</span>
        <span className="text-xl font-medium">{note}</span> */}

      {/* </div> */}
    </div>
  );
};

export default CardDataStats;
