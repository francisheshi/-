import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/menu/sidebar";
import Title1 from "./views/pages/title-1";
import Title2 from "./views/pages/title-2";
import Layout from "./components/menu/layout";
import { useSearch } from "./context/SearchContext";
import Title3 from "./views/pages/title-3";

const App = () => {
  const { query } = useSearch();

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
  return (
    <div className="App">
      <Layout>
        <main className="flex flex-row md:flex-row min-h-screen mt-14 text-start">
          <aside className="w-full md:w-64 bg-gray-800 text-center fixed top-32 bottom-1 p-1">
            <SideBar />
          </aside>
          <div className="flex-1 ml-0 md:ml-64 mt-16 md:mt-0 p-4 bg-gray-100">
            <div className="h-full flex flex-col">
              <Routes>
                <Route
                  path="/pages/page-1"
                  element={<Title1 query={query} />}
                />
                <Route
                  path="/pages/page-2"
                  element={<Title2 query={query} />}
                />
                <Route
                  path="/pages/page-3"
                  element={<Title3 query={query} data={objContent} />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default App;
