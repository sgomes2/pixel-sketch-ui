import React from "react";

const Pixel = (props) => {
  const [fillState, setFillState] = React.useState(false);

  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        border: "2px solid",
        backgroundColor: fillState ? "#000" : null,
      }}
      onClick={() => {
        setFillState(!fillState);
      }}
    ></div>
  );
};

export default Pixel;
