// Define types for the Kanban board
export type Card = {
  id: string | number;
  content: string;
  dueDate: string | null;
  completed?: boolean;
  color: string;
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
};

export type Board = {
  [columnId: string]: Column;
};

export type ColumnIdType = "todo" | "in-progress" | "testing" | "done";

// Initial Kanban board data
export const initialData: Board = {
  todo: {
    id: "todo",
    title: "To Do",
    cards: [],
  },
  "in-progress": {
    id: "in-progress",
    title: "In Progress",
    cards: [],
  },
  testing: {
    id: "testing",
    title: "Testing",
    cards: [],
  },
  completed: {
    id: "completed",
    title: "Completed",
    cards: [],
  },
};
