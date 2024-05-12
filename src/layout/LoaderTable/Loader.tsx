import { lineWobble } from 'ldrs';

const LoaderTable = () => {
  lineWobble.register();

  return (
    <>
      <div className=" p-10 w-full flex justify-center">
        <l-line-wobble
          size="100"
          stroke="7"
          bg-opacity="0.1"
          speed="1.75"
          color="#3b25ad"
        ></l-line-wobble>
      </div>
    </>
  );
};

export default LoaderTable;
