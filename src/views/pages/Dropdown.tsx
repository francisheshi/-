import React, { useEffect, useState } from "react";
import AntdDropdown from "../../components/dataEntry/AntdDropdown";
import DropdownTicket from "../../components/display/DropdownTicket";
import { months } from "../../components/dataEntry/AntdDropdown";

import "../../css/dropdown.css";

const Dropdown = () => {
  const [isExpanded] = useState(false);
  const [monthsKey, setMonthsKey] = useState(months);

  useEffect(() => {
    localStorage.setItem("monthsKey", JSON.stringify(monthsKey));
  }, [monthsKey]);

  return (
    <div className="dropdown-container">
      <h2>Dropdown</h2>

      <AntdDropdown
        placeholder="Select month"
        onChange={() => setMonthsKey(monthsKey)}
        className="collapse-code-dropdown"
        name="Dropdown"
      />
      {!isExpanded && <DropdownTicket />}
    </div>
  );
};

export default Dropdown;
