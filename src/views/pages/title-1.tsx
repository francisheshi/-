import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

import "../../styles/pages-style.css";

const { TextArea } = Input;

const Title1 = ({ query }: { query: string }) => {
  const navigate = useNavigate();

  const [objContent] = useState([
    { title: "Title 1", name: "John", age: 30, city: "New York" },
    { title: "Title 2", name: "Franci", age: 24, city: "Tirana" },
    { title: "Title 3", name: "Artur", age: 36, city: "Munich" },
  ]);

  const [expandedItems, setExpandedItems] = useState<boolean[]>(
    new Array(objContent.length).fill(false)
  );

  const collapse = (index: number) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  const copyFile = async (item: any) => {
    const textareaValue = JSON.stringify(item, undefined, 2);
    await navigator.clipboard.writeText(textareaValue);
  };

  // Filter items based on search query
  const filteredContent = objContent.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (query && filteredContent.length === 0) {
      navigate("/pages/not-found");
    }
  }, [query, filteredContent, navigate]);

  return (
    <div className="flex-1 p-10 text-lg">
      <h1 className="text-4xl font-bold mb-10">Obj Expand & Copy</h1>

      {filteredContent.length === 0 && query ? (
        <p className="text-lg">No results found for "{query}"</p>
      ) : (
        filteredContent
          // .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
          .map((item, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
              <Button
                className="mb-4"
                onClick={() => collapse(index)}
                type="primary"
                size="large"
              >
                {expandedItems[index] ? "Collapse" : "Expand"}
              </Button>
              {expandedItems[index] && (
                <div className="bg-white shadow-lg border-2 border-gray-800 rounded-lg p-4 max-w-lg">
                  <Form>
                    <TextArea
                      className="w-full mb-4"
                      size="large"
                      disabled={true}
                      rows={6}
                      value={JSON.stringify(item, undefined, 2)}
                    />
                    <Button
                      className="self-end"
                      htmlType="button"
                      onClick={() => copyFile(item)}
                      type="dashed"
                      size="small"
                    >
                      Copy
                    </Button>
                  </Form>
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default Title1;
