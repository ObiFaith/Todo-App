import Image from "next/image";
import { arrow_left, arrow_right } from "../../public";

const Pagination = ({ pageNo, setPageNo, maxPageNo }) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (pageNo > 1) pages.push(1);
    if (pageNo > 3) pages.push("...");
    if (pageNo > 2) pages.push(pageNo - 1);
    pages.push(pageNo);
    if (pageNo < maxPageNo - 1) pages.push(pageNo + 1);
    if (pageNo < maxPageNo - 2) pages.push("...");
    if (pageNo < maxPageNo) pages.push(maxPageNo);
    return pages;
  };

  const handleClick = (page) => {
    if (page === "...") return;
    setPageNo(page);
  };

  return (
    <div className="flex gap-4 transition-all py-10 items-center justify-center cursor-pointer justify-self-end col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
      {pageNo > 1 && <Image
        src={arrow_left}
        alt="arrow_left"
        onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
      />}
      <div className="flex flex-wrap items-center gap-2.5">
        {generatePageNumbers().map((page, index) => (
          <div
            key={index}
            onClick={() => handleClick(page)}
            className={`cursor-pointer font-openSans text-base font-bold shadow-md pt-1.5 px-2.5 pb-1 rounded-full ${
              page === pageNo
                ? "bg-green-400 text-white-400 text-white bg-blue-primary"
                : "text-light-blue-500 bg-white"
            }`}
          >
            {page}
          </div>
        ))}
      </div>
      {pageNo < maxPageNo && <Image
        src={arrow_right}
        alt="arrow_right"
        onClick={() => setPageNo((prev) => Math.min(prev + 1, maxPageNo))}
      />}
    </div>
  );
};

export default Pagination;