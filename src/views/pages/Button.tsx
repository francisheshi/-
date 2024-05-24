import React, { useState } from "react";
import AntdButton from "../../components/dataEntry/AntdButton";
import TextAreaForm from "../../components/display/TextAreaForm";

import "../../css/pages-style.css";

const ButtonComponent = () => {
  const [isExpanded] = useState(false);

  return (
    <div className="buttonComp-container">
      <h2>Button</h2>

      <AntdButton className="collapse-code" type="primary" name="Button" />

      {!isExpanded && <TextAreaForm />}
    </div>
  );
};

export default ButtonComponent;
