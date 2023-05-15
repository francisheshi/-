import React, { useState } from "react";
import FormArea from "../../components/display/FormArea";
import AntdForm from "../../components/AntdForm";

import "../../css/form.css";

const formCustom = {
  top: 1,
  right: 5,
  left: 34,
};

const Form = () => {
  const [isExpanded] = useState(false);

  return (
    <div className="form-container">
      <h2 style={formCustom}>Form</h2>

      <AntdForm className="form-div" />

      <br />
      {!isExpanded && <FormArea />}
    </div>
  );
};

export default Form;
