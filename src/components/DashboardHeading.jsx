import React from "react";

const DashboardHeading = ({ title, description }) => {
  return (
    <div>
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-3xl font-extrabold text-white">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DashboardHeading;
