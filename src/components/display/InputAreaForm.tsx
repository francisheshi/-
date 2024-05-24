import React, { useState } from "react";
import { Form, Input } from "antd";
import AntdButton from "../dataEntry/AntdButton";

const { TextArea } = Input;
const inputAreaValue = "<Input placeholder='Input Area...' name='Input' />";

const InputAreaForm = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyFile = async (e: any) => {
    await navigator.clipboard.writeText(inputAreaValue);
    setIsCopy(!isCopy);
    e.preventDefault();
  };

  return (
    <Form className="inputarea-form">
      <TextArea
        className="inputarea"
        size="large"
        disabled={true}
        rows={15}
        value={inputAreaValue}
      >
        {inputAreaValue}
      </TextArea>
      <AntdButton
        name="Copy"
        className="copy-code-input"
        htmlType="submit"
        onClick={copyFile}
        type="dashed"
        size="small"
      />
    </Form>
  );
};

export default InputAreaForm;
