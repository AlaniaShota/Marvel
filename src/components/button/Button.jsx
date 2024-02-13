import React from "react";

import "./Button.scss";

export const Button = ({ onClick, children, className  }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};
