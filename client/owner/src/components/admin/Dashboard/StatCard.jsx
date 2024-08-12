import React from "react";
import CountUp from "react-countup";

const StatCard = ({ title, value, icon: Icon,className  }) => (
  <div className={`card shadow-xl ${className}`}>
    <div className="card-body">
      <div className="flex justify-between items-center">
        <h2 className="card-title text-sm font-medium">{title}</h2>
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <p className="text-3xl font-bold">
     
        <CountUp end={value} duration={2.5} separator="," />
       
      </p>
    </div>
  </div>
);

export default StatCard;
