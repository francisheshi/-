import { NavLink } from "react-router-dom";
import { Button } from "antd";

const menuItems = [
  {
    key: "1",
    label: (
      <Button
        className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        type="primary"
        size="large"
        block
      >
        <NavLink to="/pages/textareas" className="text-white">
          TextAreas
        </NavLink>
      </Button>
    ),
  },
  {
    key: "2",
    label: (
      <Button
        className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        type="primary"
        size="large"
        block
      >
        <NavLink to="/pages/cards" className="text-white">
          Cards
        </NavLink>
      </Button>
    ),
  },
  {
    key: "3",
    label: (
      <Button
        className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        type="primary"
        size="large"
        block
      >
        <NavLink to="/pages/tables" className="text-white">
          Tables
        </NavLink>
      </Button>
    ),
  },
  {
    key: "4",
    label: (
      <Button
        className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        type="primary"
        size="large"
        block
      >
        <NavLink to="/pages/calendar" className="text-white">
          Calendar
        </NavLink>
      </Button>
    ),
  },
  {
    key: "5",
    label: (
      <Button
        className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        type="primary"
        size="large"
        block
      >
        <NavLink to="/pages/profile" className="text-white">
          Profile
        </NavLink>
      </Button>
    ),
  },
  {
    key: "6",
    label: (
      <Button
        className="rounded-md shadow-lg bg-blue-500 hover:bg-blue-600"
        type="primary"
        size="large"
        block
      >
        <NavLink to="/pages/kanban_board" className="text-white">
          Kanban Board
        </NavLink>
      </Button>
    ),
  },
];

export default menuItems;
