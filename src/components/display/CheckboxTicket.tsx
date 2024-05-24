import React, { useState } from "react";
import { Form, Input } from "antd";
import AntdButton from "../dataEntry/AntdButton";

const { TextArea } = Input;

const checkboxTicket = `<AntdCheckbox className="collapse-code" name="Checkbox" />`;

const CheckboxTicket = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyFile = async (e: any) => {
    await navigator.clipboard.writeText(checkboxTicket);
    setIsCopy(!isCopy);
    e.preventDefault();
  };

  return (
    <Form className="checkbox-ticket">
      <TextArea
        className="checkbox"
        size="large"
        disabled={true}
        rows={15}
        value={checkboxTicket}
      >
        {checkboxTicket}
      </TextArea>
      <AntdButton
        name="Copy"
        className="copy-code-check"
        htmlType="submit"
        onClick={copyFile}
        type="dashed"
        size="small"
      />
    </Form>
  );
};

export default CheckboxTicket;
