import React, { useState } from "react";
import InputAreaForm from "../../components/display/InputAreaForm";
import AntdInputField from "../../components/AntdInputField";

import "../../css/pages-style.css";

const Input = () => {
  const [isExpanded] = useState(false);

  return (
    <div className="input-container">
      <h2>Input</h2>

      <AntdInputField className="input-area" placeholder="Input Area..." />

      <br />
      {!isExpanded && <InputAreaForm />}
    </div>
  );
};

export default Input;
