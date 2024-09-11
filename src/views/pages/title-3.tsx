import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@tremor/react";

import "./pages-style.css";

const Title3 = ({ query }: { query: string }) => {
  const navigate = useNavigate();

  const [objContent] = useState([
    {
      id: 1,
      name: "John",
      surname: "Doe",
      age: 30,
      city: "Paris",
      country: "France",
    },
    {
      id: 2,
      name: "Franci",
      surname: "Sheshi",
      age: 24,
      city: "Tirana",
      country: "Albania",
    },
    {
      id: 3,
      name: "Artur",
      surname: "Begolli",
      age: 36,
      city: "Munich",
      country: "Germany",
    },
    {
      id: 4,
      name: "Andre",
      surname: "Pavigno",
      age: 32,
      city: "Firenze",
      country: "Italy",
    },
    {
      id: 5,
      name: "Alessio",
      surname: "Rondo",
      age: 29,
      city: "Roma",
      country: "Italy",
    },
  ]);
  const [isTableVisible, setIsTableVisible] = useState<boolean>(true);

  // Function to toggle the table visibility
  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => !prevState);
  };

  const filteredContent = objContent.filter((item) => {
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
      <h1 className="text-4xl font-bold mb-10">Table</h1>
      {filteredContent.length === 0 && query ? (
        <p className="text-lg">No results found for "{query}"</p>
      ) : (
        <>
          <Button
            className="mb-4 text-center"
            type="primary"
            size="large"
            onClick={toggleTableVisibility}
          >
            {isTableVisible ? "Collapse" : "Expand"}
          </Button>
          {isTableVisible && (
            <div className="bg-white shadow-lg border-2 border-gray-1000 rounded-lg p-4 border-r-[10px]">
              <Table className="mt-6">
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {objContent.map((item: any) => (
                    <TableRow key={item.id} id={item.id}>
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
                      <TableCell className="text-right border border-gray-800 dark:text-dark-tremor-content-strong">
                        {item.country}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Title3;
