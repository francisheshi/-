import React, { useState } from "react";
import { Button } from "antd";
import { Card } from "@tremor/react";

import "../../styles/pages-style.css";

const Title2 = ({ query }: { query: string }) => {
  const [objContent] = useState([
    { title: "Card 1", name: "John", age: 30, city: "New York" },
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

  const filteredContent = objContent.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 p-10 text-lg">
      <h1 className="text-4xl font-bold mb-10">Card</h1>

      {filteredContent
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
                <Card className="p-4 border-2 border-gray-800 rounded-lg shadow-md">
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

export default Title2;
