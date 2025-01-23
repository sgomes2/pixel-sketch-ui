import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState, useLayoutEffect } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ALL_COLORS, LED_COLORS, UI_MODES, DEFAULT_GRID_BACKGROUND_COLOR, DEFAULT_SELECTED_COLOR, TOAST_TYPES } from './constants/constants';
import { ToastContainer, toast } from 'react-toastify';

const previousSubmission = {};
const getEmptyGrid = (gridSize, color) => {
  const cleanGrid = {};
  const backgroundColor = color ? color : DEFAULT_GRID_BACKGROUND_COLOR;
  for (let i = 0; i < gridSize * gridSize; i++) {
    cleanGrid[i] = backgroundColor;
  }

  return cleanGrid;
}
function App() {
  const [selectedColor, setSelectedColor] = useState(DEFAULT_SELECTED_COLOR);
  const [uiMode, setUiMode] = useState(UI_MODES.STANDALONE);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [gridSize, setGridSize] = useState(16);
  const [pixelGridValues, setPixelGridValues] = useState(getEmptyGrid(gridSize));
  const [ledArrayConnected, setLedArrayConnected] = useState(false);

  const handleSketchRequest = () => {
    window.electronAPI.saveSketch(JSON.stringify({
      size: gridSize,
      mode: uiMode,
      sketch: { ...pixelGridValues }
    })).then((result) => {
      const { fileName, success } = result;

      if (!fileName && success) {
        return;
      }

      if (success) {
        toast.success(`Successfully saved sketch`);
      } else {
        toast.error(`Failed to saved sketch to ${fileName}`);
      }
    });
  }

  const showToast = (params) => {
    const { type, message } = params;
    switch (type) {
      case TOAST_TYPES.ERROR:
        toast.error(message);
        break;
      case TOAST_TYPES.INFO:
        toast.info(message);
        break;
      case TOAST_TYPES.SUCCESS:
        toast.success(message);
        break;
      default:
        toast.info(message);
    }
  }

  const fillSketch = () => {
    setPixelGridValues(getEmptyGrid(gridSize, selectedColor));
  }

  const handleImageDataRequest = () => {
    window.electronAPI.saveImage(JSON.stringify({
      size: gridSize,
      sketch: { ...pixelGridValues }
    })).then((result) => {
      const { fileName, success } = result;

      if (!fileName && success) {
        return;
      }

      if (success) {
        toast.success(`Successfully saved image`);
      } else {
        toast.error(`Failed to saved image to ${fileName}`);
      }
    });
  }

  const clearSketch = (requestedSize) => {
    const size = requestedSize ? requestedSize : gridSize;
    setPixelGridValues(getEmptyGrid(size));
  };

  const openSketch = (sketchData) => {
    const { size, mode, sketch, success } = sketchData;

    if (!success || !mode || !sketch || !size) {
      toast.error(`Failed to open sketch. Make sure this is a valid file`);
      return;
    }

    setPixelGridValues({ ...sketch });
    setUiMode(mode);
    setGridSize(size);
  }

  const generateRandomSketch = () => {
    const randomSketch = {};
    const numPixels = gridSize * gridSize;

    const colors = uiMode === UI_MODES.LED_ARRAY ? LED_COLORS : ALL_COLORS;

    for (let i = 0; i < numPixels; i++) {
      const pallet = Math.floor(Math.random() * colors.length);
      const randomColor = colors[pallet][Math.floor(Math.random() * colors[pallet].length)];

      randomSketch[i] = randomColor;
    }

    setPixelGridValues(randomSketch);
  }

  useLayoutEffect(() => {
    window.electronAPI.onSetMode((modeVal) => {
      const { mode, size } = modeVal;
      if (size !== gridSize) {
        clearSketch(size);
      }

      setUiMode(mode);
      setGridSize(size);
    });

    window.electronAPI.onLedArrayStatusChange((status) => {
      setLedArrayConnected(status);
    });

    window.electronAPI.onShowToast((params) => {
      showToast(params);
    });

    window.electronAPI.onClearSketch(() => {
      clearSketch();
    });

    window.electronAPI.onFillSketch(() => {
      fillSketch(selectedColor);
    })

    window.electronAPI.onOpenSketch((sketchData) => {
      openSketch(sketchData);
    });

    window.electronAPI.onRandomSketch(() => {
      clearSketch();
      generateRandomSketch();
    });

    window.electronAPI.onRequestSketch(() => {
      handleSketchRequest();
    });

    window.electronAPI.onRequestImageData(() => {
      handleImageDataRequest();
    });

    const updateSize = () => {
      setSize({ width: window.innerWidth * .8, height: window.innerHeight * .8 });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize)
      window.electronAPI.removeAllListeners();
    };
  }, [gridSize, pixelGridValues, selectedColor]);

  const updateLedArray = () => {
    let pixelArray = "";
    for (let i = 0; i < gridSize * gridSize; i++) {

      if (pixelGridValues[i] !== undefined && pixelGridValues[i] !== null && previousSubmission[i] !== pixelGridValues[i]) {
        pixelArray += `[${i},${pixelGridValues[i].replace('#', '0x')}]`
        previousSubmission[i] = pixelGridValues[i];
      }
    }

    window.electronAPI.updateLedArray(pixelArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
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
            <Button disabled={!ledArrayConnected} variant="contained" onClick={updateLedArray} startIcon={<LightModeIcon />}>
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
