import React, { useState } from "react";

function Navigation() {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <ul>
      <li
        className={activeLink === 0 ? "active" : ""}
        onClick={() => handleLinkClick(0)}
      >
        Link 1
      </li>
      <li
        className={activeLink === 1 ? "active" : ""}
        onClick={() => handleLinkClick(1)}
      >
        Link 2
      </li>
      <li
        className={activeLink === 2 ? "active" : ""}
        onClick={() => handleLinkClick(2)}
      >
        Link 3
      </li>
    </ul>
  );
}
export default Navigation;
