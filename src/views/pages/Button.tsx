import React, { useState } from "react";
import Button from "../../components/AntdButton";
import AntdTextAreaForm from "../../components/display/TextAreaForm";

import "../../css/pages-style.css";

const ButtonComponent = () => {
  const [isExpanded] = useState(false);

  return (
    <div className="buttonComp-container">
      <h2>Button</h2>

      <Button className="collapse-code" type="primary" name="Button" />

      {!isExpanded && <AntdTextAreaForm />}
    </div>
  );
};

export default ButtonComponent;
