import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import SideBar from "./views/menu/sidebar";
import Title1 from "./views/pages/title-1";
import Title2 from "./views/pages/title-2";
import Layout from "./views/menu/layout";

const App = () => {
  return (
    <div className="App">
      <SearchProvider>
        <Router>
          <Layout>
            <main className="flex flex-col md:flex-row min-h-screen mt-16 text-start">
              <aside className="w-full md:w-64 bg-gray-800 text-center fixed top-24 bottom-0 shadow-md p-1">
                <SideBar />
              </aside>
              <div className="flex-1 ml-0 md:ml-64 mt-16 md:mt-0 p-4 bg-gray-100">
                <div className="h-full flex flex-col">
                  <Routes>
                    <Route path="/pages/page-1" element={<Title1 />} />
                    <Route path="/pages/page-2" element={<Title2 />} />
                  </Routes>
                </div>
              </div>
            </main>
          </Layout>
        </Router>
      </SearchProvider>
    </div>
  );
};

export default App;
