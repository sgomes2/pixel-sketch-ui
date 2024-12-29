import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState, useEffect } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import LightModeIcon from '@mui/icons-material/LightMode';
import { UI_MODES } from './constants/constants';

const previousSubmission = {};

function App() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [pixelGridValues, setPixelGridValues] = useState({});
  const [uiMode, setUiMode] = useState(UI_MODES.STANDALONE);

  useEffect(() => {
    window.electronAPI.onSetMode((modeVal) => {
      setUiMode(modeVal);
    })
  }, []);

  const updateLedArray = () => {
    let pixelArray = "";
    for (let i = 0; i < 256; i++) {

      if (pixelGridValues[i] !== undefined && pixelGridValues[i] !== null && previousSubmission[i] !== pixelGridValues[i]) {
        pixelArray += `[${i}:${pixelGridValues[i]}]`
        previousSubmission[i] = pixelGridValues[i];
      }
    }

    window.electronAPI.updateLedArray(pixelArray);
  }

  const clearSketch = () => {
    setPixelGridValues({});
  }

  const generateRandomSketch = () => {
    const randomSketch = {};


    for (let i = 0; i < 256; i++) {
      randomSketch[i] = Math.floor(Math.random() * 8);
    }

    setPixelGridValues(randomSketch);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ marginTop: '10px' }}>Pixel Sketch</h2>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '10px' }}>
            <PixelGrid gridValues={pixelGridValues} updateGridValues={setPixelGridValues} selectedColor={selectedColor} uiMode={uiMode} />
          </div>
          <div style={{ margin: '10px' }}>
            <ColorPicker onClick={setSelectedColor} uiMode={uiMode} />
          </div>
        </div>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={generateRandomSketch} startIcon={<ShuffleIcon />}>
            Random Sketch
          </Button>
          <Button variant="contained" onClick={clearSketch} startIcon={<ClearAllIcon />}>
            Clear Sketch
          </Button>
          {uiMode === UI_MODES.LED_ARRAY ?
            <Button variant="contained" onClick={updateLedArray} startIcon={<LightModeIcon />}>
              Light Up Box
            </Button> :
            null}
        </Stack>

      </header>
    </div>
  );
}

export default App;
