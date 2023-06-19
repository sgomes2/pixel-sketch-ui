import React from "react";

const Pixel = (props) => {
  const [fillState, setFillState] = React.useState(false);

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        marginRight: "5px",
        marginBottom: "2px",
        border: "2px solid",
        backgroundColor: fillState ? "#000" : null,
        display: "inline-block",
      }}
      onClick={() => {
        setFillState(!fillState);
      }}
    ></div>
  );
};

export default Pixel;
