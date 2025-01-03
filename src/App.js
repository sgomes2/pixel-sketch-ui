import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState, useLayoutEffect } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ALL_COLORS, LED_COLORS, UI_MODES, DEFAULT_COLOR } from './constants/constants';

const previousSubmission = {};
const getEmptyGrid = (gridSize) => {
  const cleanGrid = {};
  for (let i = 0; i < gridSize * gridSize; i++) {
    cleanGrid[i] = DEFAULT_COLOR;
  }

  return cleanGrid;
}
function App() {
  const [selectedColor, setSelectedColor] = useState("White");
  const [uiMode, setUiMode] = useState(UI_MODES.STANDALONE);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [gridSize, setGridSize] = useState(16);
  const [pixelGridValues, setPixelGridValues] = useState(getEmptyGrid(gridSize));

  const handleSketchRequest = () => {
    window.electronAPI.saveSketch(JSON.stringify({
      size: gridSize,
      sketch: { ...pixelGridValues }
    }));
  }

  const clearSketch = () => {
    setPixelGridValues(getEmptyGrid(gridSize));
  }

  const generateRandomSketch = () => {
    const randomSketch = {};
    console.log('Generating Random Sketch')

    const colors = uiMode === UI_MODES.LED_ARRAY ? LED_COLORS : ALL_COLORS;

    for (let i = 0; i < gridSize * gridSize; i++) {
      const pallet = Math.floor(Math.random() * colors.length);
      const randomColor = colors[pallet][Math.floor(Math.random() * colors[pallet].length)];

      randomSketch[i] = randomColor;
    }

    setPixelGridValues(randomSketch);
  }

  useLayoutEffect(() => {
    window.electronAPI.onSetMode((modeVal) => {
      const { mode, size } = modeVal;
      clearSketch();
      setUiMode(mode);
      setGridSize(size);
    });

    window.electronAPI.onClearSketch(() => {
      clearSketch();
    });

    window.electronAPI.onRandomSketch(() => {
      clearSketch();
      generateRandomSketch();
    });

    window.electronAPI.onRequestSketch(() => {
      handleSketchRequest();
    })

    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const updateLedArray = () => {
    let pixelArray = "";
    for (let i = 0; i < gridSize * gridSize; i++) {

      if (pixelGridValues[i] !== undefined && pixelGridValues[i] !== null && previousSubmission[i] !== pixelGridValues[i]) {
        pixelArray += `[${i}:${pixelGridValues[i]}]`
        previousSubmission[i] = pixelGridValues[i];
      }
    }

    console.log(`Sending pixelArray: ${pixelArray}`);

    window.electronAPI.updateLedArray(pixelArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '10px' }}>
            <PixelGrid gridValues={pixelGridValues}
              updateGridValues={setPixelGridValues}
              selectedColor={selectedColor}
              uiMode={uiMode}
              screenSize={size}
              gridSize={gridSize}
            />
          </div>
        </div>

        <div style={{ margin: '10px' }}>
          <ColorPicker
            onClick={setSelectedColor}
            uiMode={uiMode}
            screenSize={size}
          />
        </div>
        {uiMode === UI_MODES.LED_ARRAY ?
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={updateLedArray} startIcon={<LightModeIcon />}>
              Light Up Box
            </Button>
          </Stack>
          :
          null}
      </header>
    </div>
  );
}

export default App;
