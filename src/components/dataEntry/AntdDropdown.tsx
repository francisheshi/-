import React from "react";
import { Form, Select } from "antd";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface AntdDropdownProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick?: any;
  htmlType?: any;
  type?: any;
  className?: string;
  size?: any;
  name?: any;
  onChange?: any;
  placeholder: string;
}

const AntdDropdown = (props: AntdDropdownProps) => {
  return (
    <Form.Item>
      <Select
        optionFilterProp="children"
        className={props.className}
        onChange={props.onChange}
        placeholder={props.placeholder}
        style={{ width: "30%" }}
      >
        {months.map((month, idx) => (
          <Select.Option key={idx}>{month}</Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AntdDropdown;
