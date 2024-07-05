import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState('black')
  return (
    <div className="App">
      <header className="App-header">
        <PixelGrid selectedColor={selectedColor}/>
        <ColorPicker onClick={setSelectedColor}/>
      </header>
    </div>
  );
}

export default App;
