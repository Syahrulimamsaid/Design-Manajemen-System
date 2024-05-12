import { hatch } from 'ldrs';

const Loader = () => {
  hatch.register();

  return (
    // <div className="flex h-screen items-center justify-center bg-white">
    //   <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#00cd61] border-t-transparent"></div>
    // </div>
    <div className="flex h-screen items-center justify-center bg-white">
      <l-hatch size="150" stroke="30" speed="3.5" color="#3b25ad"></l-hatch>
    </div>
  );
};

export default Loader;
