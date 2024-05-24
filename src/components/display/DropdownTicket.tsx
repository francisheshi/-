import React, { useState } from "react";
import { Form, Input } from "antd";
import AntdButton from "../dataEntry/AntdButton";

const { TextArea } = Input;

const dropdownTicket = `<AntdDropdown placeholder="Select month" className="collapse-code-dropdown" name="Dropdown" />`;

const DropdownTicket = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyFile = async (e: any) => {
    await navigator.clipboard.writeText(dropdownTicket);
    setIsCopy(!isCopy);
    e.preventDefault();
  };

  return (
    <Form className="dropdown-ticket">
      <TextArea
        className="dropdown"
        size="large"
        disabled={true}
        rows={15}
        value={dropdownTicket}
      >
        {dropdownTicket}
      </TextArea>
      <AntdButton
        name="Copy"
        className="copy-code-drop"
        htmlType="submit"
        onClick={copyFile}
        type="dashed"
        size="small"
      />
    </Form>
  );
};

export default DropdownTicket;
