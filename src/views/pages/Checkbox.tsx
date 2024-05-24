import React, { useState } from "react";
import AntdCheckbox from "../../components/dataEntry/AntdCheckbox";
import CheckboxTicket from "../../components/display/CheckboxTicket";

import "../../css/checkboxes.css";

const Checkbox = () => {
  const [isExpanded] = useState(false);

  return (
    <div className="checkbox-container">
      <h2>Checkboxes</h2>

      <AntdCheckbox className="collapse-code" name="Checkbox" />

      {!isExpanded && <CheckboxTicket />}
    </div>
  );
};

export default Checkbox;
