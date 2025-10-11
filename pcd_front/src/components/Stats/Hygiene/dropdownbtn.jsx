import { useEffect, useState } from "react";
import "../../../assets/css/Stats/Hygiene/dropdownbtn.css";

function DropDownButton({ label, items, setState }) {
  const [Label, setLabel] = useState(label);

  useEffect(() => {
    setLabel(label); // Sync with parent label prop
  }, [label]);

  const LabelHandler = (item) => {
    setLabel(item);
    setState(item);
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        aria-expanded="false"
        style={{ width: "150px" }}
      >
        {Label}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              onClick={() => LabelHandler(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDownButton;
