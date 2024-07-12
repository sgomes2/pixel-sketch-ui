import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState(0)
  
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{marginTop: '10px'}}>Pixel Sketch</h2>
        <PixelGrid selectedColor={selectedColor}/>
        <h4 style={{marginTop: '10px', marginBottom: '10px'}}>Color Picker</h4>
        <ColorPicker onClick={setSelectedColor}/>
      </header>
    </div>
  );
}

export default App;
