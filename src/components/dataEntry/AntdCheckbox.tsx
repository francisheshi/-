import React from "react";
import { Checkbox, Form } from "antd";

interface AntdCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick?: any;
  htmlType?: any;
  type?: any;
  className?: string;
  size?: any;
  name?: any;
  onChange?: any;
}

const AntdCheckbox = (props: AntdCheckboxProps) => {
  return (
    <Form.Item>
      <Checkbox
        className={props.className}
        onChange={props.onChange}
        {...props}
      >
        {props.children}
      </Checkbox>
    </Form.Item>
  );
};

export default AntdCheckbox;
