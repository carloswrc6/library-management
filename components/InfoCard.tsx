import React from "react";

interface Props {
  title: string;
  total: string;
  trend?: number;
}

const InfoCard = ({ title, total, trend }: Props) => {
  return (
    <div className="stat">
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        {trend && (
          <p className={trend >= 0 ? "text-green-500" : "text-red-500"}>
            {trend >= 0 ? "+" : ""}
            {trend}%
          </p>
        )}
      </div>
      <h1 className="stat-count">{total}</h1>
    </div>
  );
};

export default InfoCard;
