// File: DownloadButton.tsx
import React, { useEffect } from 'react';

interface ButtonPositiveProps {
  text: string;
  Click: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonNegative = (props: ButtonPositiveProps) => {
  const { text, Click } = props;

  useEffect(() => {});

  return (
    <>
      <button
        className="flex w-full justify-center rounded bg-[#ecefff] rounded-lg border border-[#7776ff] p-3 font-poppins font-medium text-[#201650] hover:bg-[#dde2ff]"
        onClick={Click}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonNegative;
