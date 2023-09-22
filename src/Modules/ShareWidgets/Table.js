import React, { useState, useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const PaginationButton = ({ icon, onClick, disabled }) => (
  <button
    className={`h-10 px-2 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800 ${disabled && "opacity-50 cursor-not-allowed"}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
  </button>
);

const Table = ({ data, columns, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = itemsPerPage * (currentPage - 1);
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleGoClick = () => {
    const page = Number(inputPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setInputPage(currentPage);
    }
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-3 md:flex items-center justify-between">
        <p className='pb-5'>Page {currentPage} of total {totalPages} pages</p>
        <div>
          <PaginationButton
            icon={<FaAngleDoubleLeft />}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <PaginationButton
            icon={<FaAngleLeft />}
            onClick={() => setCurrentPage((old) => Math.max(1, old - 1))}
            disabled={currentPage === 1}
          />
          <input
            className="h-10 px-2 m-2 transition-colors duration-150 rounded-lg focus:shadow-outline"
            type="number"
            min={1}
            max={totalPages}
            value={inputPage}
            onChange={handleChange}
          />
          <button
            className="h-10 px-2 m-2 transition-colors duration-150 bg-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-700"
            onClick={handleGoClick}
          >
            Go
          </button>
          <PaginationButton
            icon={<FaAngleRight />}
            onClick={() => setCurrentPage((old) => Math.min(totalPages, old + 1))}
            disabled={currentPage === totalPages}
          />
          <PaginationButton
            icon={<FaAngleDoubleRight />}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
