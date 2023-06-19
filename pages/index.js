import React from "react";
import PixelGrid from "../components/PixelGrid";

export default function Home() {
  return (
    <div
      className="App"
      style={{
        marginLeft: "5%",
      }}
    >
      <h1>Pixel Sketch</h1>
      <PixelGrid gridSize={16} />
    </div>
  );
}
