import { quantum } from 'ldrs';

const Loader = () => {
  quantum.register();
  return (
    // <div className="flex h-screen items-center justify-center bg-white">
    //   <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#00cd61] border-t-transparent"></div>
    // </div>
    <div className="flex h-screen items-center justify-center bg-white">
      <l-quantum size="100" speed="1.75" color="green"></l-quantum>
    </div>
  );
};

export default Loader;
