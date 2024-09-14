import React from "react";
import { Button, Text } from "@tremor/react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PaginationTableProps {
  data: any[];
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  data,
  currentPage,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex flex-row md:flex-row justify-between items-center mt-4">
      <Text className="mb-2 md:mb-0">
        Page {currentPage} of {totalPages}
      </Text>

      {/* Pagination Buttons */}
      <div className="flex mb-2 md:mb-0">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="secondary"
          className="flex items-center"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="ml-2 flex items-center"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>

      {/* Rows Per Page Selector */}
      <div className="ml-4 flex">
        <Text>Rows per page:</Text>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="ml-2"
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationTable;
