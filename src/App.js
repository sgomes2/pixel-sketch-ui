import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [pixelGridValues, setPixelGridValues] = useState({});

  const updateLedArray = () => {
    const pixelArray = [];
    for(let i = 0; i < 256; i++) {
        pixelArray.push(pixelGridValues[i] || 0);
    }
    console.log(pixelArray.toString());
}
  
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{marginTop: '10px'}}>Pixel Sketch</h2>
        <PixelGrid gridValues={pixelGridValues} updateGridValues={setPixelGridValues} selectedColor={selectedColor}/>
        <button onClick={updateLedArray}>Light It Up!</button>
        <h4 style={{marginTop: '10px', marginBottom: '10px'}}>Color Picker</h4>
        <ColorPicker onClick={setSelectedColor}/>
      </header>
    </div>
  );
}

export default App;
