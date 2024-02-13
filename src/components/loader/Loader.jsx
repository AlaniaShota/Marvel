import React from "react";
import "./Loader.scss";

export const Loader = () => {
  return (
   <div className="loader-content">
     <div className="loader">
      Loading
      <span className="loader-animation"></span>
    </div>
   </div>
  );
};
