import "./App.css";
import PixelGrid from "./components/PixelGrid/PixelGrid";

function App() {
  return (
    <div
      className="App"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>Pixel Sketch</h1>
      <PixelGrid gridSize={16} />
    </div>
  );
}

export default App;
