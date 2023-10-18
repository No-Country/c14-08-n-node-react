import { FaMagnifyingGlass } from "react-icons/fa6";

const LawyerSearch = () => {
  return (
    <div className="main-container">
      <div className="mt-[46px] flex items-center justify-center gap-[34px] rounded-[12px] bg-gray-700 px-[40px] py-[13px]">
        <FaMagnifyingGlass className="text-white" />
        <input className="h-[32px] flex-1 rounded-[5px] bg-white px-[15px]" />
      </div>
    </div>
  );
};

export default LawyerSearch;
