import React from "react";

const Snake = ({snakeDots}) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          // left: `${dot[0]}%`,
          // top: `${dot[1]}%`
          left: `${dot[0]}px`,
          top: `${dot[1]}px`
        };
        return <div className="snake" key={i} style={style} />;
      })}
    </div>
  );
};
export default Snake;
