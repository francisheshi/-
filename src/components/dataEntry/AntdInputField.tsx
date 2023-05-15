import React from "react";
import { Form, Input } from "antd";

interface AntdInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  htmlType?: any;
  type?: any;
  className?: string;
  size?: any;
  name?: string;
}

const AntdInputField = (props: AntdInputProps) => {
  return (
    <Form.Item>
      <Input className={props.className} {...props}>
        {props.name}
      </Input>
    </Form.Item>
  );
};

export default AntdInputField;
