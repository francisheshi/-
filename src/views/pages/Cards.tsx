import React, { FC, useState } from "react";
import { Button } from "antd";
import { Card } from "@tremor/react";
import { SearchContextProps } from "../../context/SearchContext";

import "../../styles/pages-style.css";

const Cards = ({ query }: { query: string }) => {
  const [objContent] = useState([
    { id: 1, title: "Card 1", name: "John", age: 30, city: "New York" },
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
    try {
      await navigator.clipboard.writeText(textareaValue);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const filteredContent = objContent.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 p-10 text-lg">
      <h1 className="text-4xl font-bold mb-8">Card</h1>
      {filteredContent.map((item, index) => (
        <div key={item.id} className="mb-6">
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
              <Card key={item.id} className="flex-shrink-0 w-64">
                <h3 className="text-xl font-bold mb-2">Details</h3>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Age:</strong> {item.age}
                </p>
                <p>
                  <strong>City:</strong> {item.city}
                </p>
              </Card>
              <Button
                className="mt-4"
                htmlType="button"
                onClick={() => copyFile(item)}
                type="dashed"
                size="small"
              >
                Copy
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;
