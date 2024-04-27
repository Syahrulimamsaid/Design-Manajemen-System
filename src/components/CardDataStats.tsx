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
  note,
  // levelUp,
  // levelDown,
  children,
}) => {
  return (
    <div className="flex justify-center rounded-sm border border-stroke bg-white py-20 px-7 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div> */}

      <div className="flex flex-col items-center justify-center text-center space-y-10">
        <h4 className="text-3xl font-black text-black dark:text-white">
          {title}
        </h4>
        <span className="text-8xl font-black text-[#00c45e]">{total}</span>
        <span className="text-xl font-medium">{note}</span>

      </div>
    </div>
  );
};

export default CardDataStats;
