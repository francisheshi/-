import React, { useState } from "react";
import { Form, Input } from "antd";
import AntdButton from "../dataEntry/AntdButton";

const { TextArea } = Input;
const textareaValue = "<Button type='primary' name='Button' />";

const AntdTextAreaForm = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyFile = async (e: any) => {
    await navigator.clipboard.writeText(textareaValue);
    setIsCopy(!isCopy);
    e.preventDefault();
  };

  return (
    <Form className="textarea-form">
      <TextArea
        className="textarea"
        size="large"
        disabled={true}
        rows={15}
        value={textareaValue}
      >
        {textareaValue}
      </TextArea>
      <AntdButton
        name="Copy"
        className="copy-code-button"
        htmlType="submit"
        onClick={copyFile}
        type="dashed"
        size="small"
      />
    </Form>
  );
};

export default AntdTextAreaForm;
