import PixelGrid from './components/PixelGrid/PixelGrid';
import './App.css';
import { useState } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
const { ipcRenderer } = window.require("electron");

// const io =  require("socket.io-client");

// const socket = io('http://192.168.1.160:9080');

// // Handle connection
// socket.on('connect', () => {
//     console.log('Connected to server');
// });

function App() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [pixelGridValues, setPixelGridValues] = useState({});
  const updateLedArray = () => {
    let pixelArray = "";
    for (let i = 0; i < 256; i++) {
      pixelArray += `[${i}:${pixelGridValues[i] || 0}]`
    }
    console.log(pixelArray);

    // Create WebSocket connection.
    ipcRenderer.send('set-sketch', pixelArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ marginTop: '10px' }}>Pixel Sketch</h2>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '10px' }}>
            <PixelGrid gridValues={pixelGridValues} updateGridValues={setPixelGridValues} selectedColor={selectedColor} />
          </div>
          <div style={{ margin: '10px' }}>
            <ColorPicker onClick={setSelectedColor} />
          </div>
        </div>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download Sketch
          </Button>
          <Button variant="contained" endIcon={<UploadIcon />}>
            Open Sketch
          </Button>
        </Stack>

        <button onClick={updateLedArray}>Light It Up!</button>

      </header>
    </div>
  );
}

export default App;
