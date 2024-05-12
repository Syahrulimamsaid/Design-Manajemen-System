// File: DownloadButton.tsx
import React, { useEffect } from 'react';

interface ButtonPositiveProps {
  text: string;
  Click: React.MouseEventHandler<HTMLButtonElement>;
  childern?: React.ReactElement<any, any>;
}

const ButtonPositive = (props: ButtonPositiveProps) => {
  const { text, Click, childern } = props;

  useEffect(() => {});

  return (
    <>
      <button
        onClick={Click}
        className="flex w-full justify-center rounded rounded-lg bg-gradient-to-r from-[#5537f4] to-[#6456fe] p-3 font-poppins font-medium text-slate-50 transition bg-opacity-10 hover:opacity-85 flex items-center px-7"
      >
      {childern}
        <p className="text-[#ecefff] font-semibold text-md ml-2">{text}</p>
      </button>
    </>
  );
};

export default ButtonPositive;
