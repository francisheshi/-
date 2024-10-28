import React, { useState, useEffect, FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@tremor/react";
import PaginationTable from "../../components/ui/PaginationTable";
import { QueryItem } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import "../../styles/pages-style.css";
import { Button } from "antd";

const Tables = ({ query, data }: { query: string; data: any[] }) => {
  const navigate = useNavigate();

  const [isTableVisible, setIsTableVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(2);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get data for current page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page after rows per page change
  };

  const collapse = () => {
    setIsTableVisible((prevState) => !prevState);
  };

  // Filter content based on query
  const filteredContent = data.filter((item: any) => {
    const itemIdString = item.id.toString();
    return (
      Number(itemIdString.replace(/\.$/, "")) ===
      Number(query.trim().replace(/\.$/, ""))
    );
  });

  useEffect(() => {
    if (query && filteredContent.length === 0) {
      navigate("/pages/not-found");
    }
  }, [query, filteredContent, navigate]);

  return (
    <div className="flex-1 p-10 text-lg">
      <h1 className="text-4xl font-bold mb-8">Table</h1>
      {filteredContent.length === 0 && query ? (
        <p className="text-lg">No results found for '{query}'</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">Table 1</h2>
          <Button
            className="mb-4 text-center"
            type="primary"
            size="large"
            onClick={() => collapse()}
          >
            {isTableVisible ? "Collapse" : "Expand"}
          </Button>
          {isTableVisible && (
            <div className="bg-white shadow-lg border-2 border-gray-1000 rounded-lg p-4 border-r-[10px]">
              <div className="overflow-x-auto">
                <Table className="mt-6 w-full">
                  <TableHead>
                    <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border items-center border-6">
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Title
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Name
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Surname
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Age
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        City
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Country
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        ISO Codes
                      </TableCell>
                      <TableCell className="border bg-red-100 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Number Code
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="border bg-green-200 border-gray-800 font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          {item.id + "."}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.name}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.surname}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.age}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.city}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.country}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.isoCountryCodes}
                        </TableCell>
                        <TableCell className="border border-gray-800 dark:text-dark-tremor-content-strong">
                          {item.numberCode}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <PaginationTable
                data={data}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tables;
