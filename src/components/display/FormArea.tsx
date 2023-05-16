import React, { useState } from "react";
import { Form, Input } from "antd";
import AntdButton from "../dataEntry/AntdButton";

const { TextArea } = Input;
const formAreaValue = `<Form
  {...props}
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 16 }}
  style={{ maxWidth: 600 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
>
  <Form.Item
    label="Username"
    name="username"
    rules={[{ required: true, message: "Please input your username!" }]}
    placeholder="Add username..."
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: "Please input your password!" }]}
    placeholder="Add password..."
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    name="remember"
    valuePropName="checked"
    wrapperCol={{ offset: 8, span: 16 }}
  >
    <Checkbox>Remember me</Checkbox>
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>`;

const FormArea = () => {
  const [isCopy, setIsCopy] = useState(false);

  const copyFile = async (e: any) => {
    await navigator.clipboard.writeText(formAreaValue);
    setIsCopy(!isCopy);
    e.preventDefault();
  };

  return (
    <Form className="form-div_test">
      <TextArea
        className="form_test"
        size="large"
        disabled={true}
        rows={15}
        value={formAreaValue}
      >
        {formAreaValue}
      </TextArea>
      <AntdButton
        name="Copy"
        className="copy-code-form"
        htmlType="submit"
        onClick={copyFile}
        type="dashed"
        size="small"
      />
    </Form>
  );
};

export default FormArea;
