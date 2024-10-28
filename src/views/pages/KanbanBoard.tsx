import React, { FC, useState } from "react";
import { Card, initialData, ColumnIdType } from "../../lib/kanbanUtil";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { Edit } from "lucide-react";
import CardModal from "./CardModal";
import { Button } from "antd";
import moment from "moment";

const KanbanBoard = ({ query }: { query: string }) => {
  const [boardData, setBoardData] = useState(initialData);
  const [draggingCard, setDraggingCard] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [editColumnId, setEditColumnId] = useState<string | null>(null);

  const columnColors: { [key in ColumnIdType]: string } = {
    todo: "bg-blue-100",
    "in-progress": "bg-yellow-100",
    testing: "bg-orange-100",
    done: "bg-green-100",
  };

  const addCard = (
    columnId: string,
    content: string,
    dueDate: moment.Moment | null
  ) => {
    const newCard: Card = {
      id: `card-${Date.now()}`,
      content: content,
      dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null,
      color: "",
    };

    setBoardData((prevBoardData) => {
      const column = prevBoardData[columnId];
      if (!column) {
        console.error("Column not found:", columnId);
        return prevBoardData;
      }
      return {
        ...prevBoardData,
        [columnId]: {
          ...column,
          cards: [...column.cards, newCard],
        },
      };
    });
  };

  const showModal = () => {
    setCurrentCard(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openEditModal = (columnId: string, card: Card) => {
    setCurrentCard(card);
    setEditColumnId(columnId);
    setIsModalVisible(true);
  };

  const saveCard = (content: string, dueDate: moment.Moment | null) => {
    if (currentCard && editColumnId) {
      setBoardData((prevBoardData) => {
        const column = prevBoardData[editColumnId];
        const updatedCards = column.cards.map((card) =>
          card.id === currentCard.id
            ? {
                ...card,
                content: content,
                dueDate: dueDate ? dueDate.format("YYYY-MM-DD") : null,
              }
            : card
        );

        return {
          ...prevBoardData,
          [editColumnId]: {
            ...column,
            cards: updatedCards,
          },
        };
      });
    } else {
      addCard("todo", content, dueDate);
    }
  };

  const handleDrop = (columnId: ColumnIdType, card: Card) => {
    const updatedCard = { ...card, color: columnColors[columnId] };

    setBoardData((prevData) => {
      const newColumns = { ...prevData };
      const currentColumn = Object.values(newColumns).find((col) =>
        col.cards.some((c) => c.id === card.id)
      );
      if (currentColumn) {
        currentColumn.cards = currentColumn.cards.filter(
          (c) => c.id !== card.id
        );
      }
      newColumns[columnId].cards.push(updatedCard);
      setDraggingCard(null);
      return newColumns;
    });
  };

  const handleDragStart: DraggableEventHandler = (_, data) => {
    setDraggingCard(
      data.node.dataset.id ? parseInt(data.node.dataset.id) : null
    );
  };

  return (
    <div className="flex-1 p-10 text-lg">
      <h1 className="text-4xl font-bold mb-8">Kanban Board</h1>
      <div className="flex space-x-10 justify-around">
        {Object.values(boardData).map((column) => (
          <div
            key={column.id}
            className="bg-gray-200 p-4 rounded-lg w-64 shadow-md flex flex-col min-h-[200px]"
          >
            <h3 className="font-bold text-center mb-3">{column.title}</h3>

            <div className="flex flex-col space-y-2 flex-grow">
              {column.cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  onStart={handleDragStart}
                  onStop={() => handleDrop(column.id as ColumnIdType, card)}
                >
                  <div
                    data-id={card.id}
                    className={`p-2 mb-2 rounded-lg shadow-md ${
                      draggingCard === card.id ? "bg-red-200" : card.color
                    }`}
                  >
                    <div className="flex justify-between items-center cursor-move">
                      <span className="cursor-move">{card.content}</span>
                      <Button
                        onClick={() => openEditModal(column.id, card)}
                        className="ml-2 p-1 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                      >
                        <Edit className="text-gray-500 text-base" />
                      </Button>
                    </div>
                    {card.dueDate && (
                      <div className="text-sm text-gray-600">
                        Due Date: {card.dueDate}
                      </div>
                    )}
                  </div>
                </Draggable>
              ))}
            </div>

            {/* Add New Card Button */}
            {column.id === "todo" && (
              <Button
                onClick={showModal}
                className="mt-2 bg-blue-500 text-white hover:bg-blue-600 w-full"
              >
                + Add New Card
              </Button>
            )}
          </div>
        ))}
      </div>

      <CardModal
        isVisible={isModalVisible}
        onClose={handleCancel}
        onSaveCard={saveCard}
        cardToEdit={
          currentCard
            ? { content: currentCard.content, dueDate: currentCard.dueDate }
            : undefined
        }
      />
    </div>
  );
};

export default KanbanBoard;
