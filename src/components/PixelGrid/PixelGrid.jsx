import React from 'react';
import './PixelGrid.css'
import { LED_COLORS, ALL_COLORS, UI_MODES } from '../../constants/constants'

class PixelGrid extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {};
        this.getPixel = this.getPixel.bind(this);
        this.getPixelRow = this.getPixelRow.bind(this);
        this.updatePixelVal = this.updatePixelVal.bind(this);
        this.getPixelFromMouseEvent = this.getPixelFromMouseEvent.bind(this);
    }

    getPixelFromMouseEvent(e, pixelSize, gridSize) {
        const rect = e.currentTarget.getBoundingClientRect();
        const padding = 7;
        const cellSize = pixelSize + 2; // +2 accounts for 1px border on each side (content-box)
        const col = Math.floor((e.clientX - rect.left - padding) / cellSize);
        const row = Math.floor((e.clientY - rect.top - padding) / cellSize);

        if (col < 0 || col >= gridSize || row < 0 || row >= gridSize) return null;

        if (row % 2 === 0) {
            return (gridSize * row) + (gridSize - 1 - col);
        } else {
            return (gridSize * row) + col;
        }
    }

    updatePixelVal(pixelNum) {
        const { selectedColor, updateGridValues, gridValues } = this.props;

        updateGridValues({ ...gridValues, [pixelNum]: selectedColor });
    }

    getPixel(pixelNum, pixelSize) {
        const { gridValues } = this.props
        const color = gridValues[pixelNum];

        return (
            <div
                key={`pixel-${pixelNum}`}
                style={{
                    backgroundColor: color !== undefined ? `${color}` : 'Black',
                    minHeight: `${pixelSize}px`, maxHeight: `${pixelSize}px`,
                    minWidth: `${pixelSize}px`, maxWidth: `${pixelSize}px`,
                }}
                className='pixel'
            />
        )
    }

    getPixelRow(rowNum, pixelSize, numPixels) {
        const pixels = [];

        for (let i = 1; i <= numPixels; i++) {
            if (rowNum % 2 === 0) {
                pixels.push(this.getPixel((numPixels * rowNum) + (numPixels - i), pixelSize));
            } else {
                pixels.push(this.getPixel((numPixels * rowNum) + (i - 1), pixelSize));
            }
        }

        return (
            <div key={`Pixel_Row_${rowNum}`} className='pixelRow'>
                {pixels}
            </div>
        )
    }

    render() {
        const { screenSize, gridSize } = this.props
        const { width, height } = screenSize;

        const pixelRows = [];

        const pixelSize = Math.floor((Math.min(height, width) * .75) / gridSize);

        for (let i = 0; i < gridSize; i++) {
            pixelRows.push(this.getPixelRow(i, pixelSize, gridSize));
        }
        return (
            <div>
                <div
                    onMouseDown={(e) => {
                        this.setState({ mouseDown: true });
                        const pixelNum = this.getPixelFromMouseEvent(e, pixelSize, gridSize);
                        if (pixelNum !== null) this.updatePixelVal(pixelNum);
                    }}
                    onMouseUp={() => { this.setState({ mouseDown: false }) }}
                    onMouseMove={(e) => {
                        if (!this.state.mouseDown) return;
                        const pixelNum = this.getPixelFromMouseEvent(e, pixelSize, gridSize);
                        if (pixelNum !== null) this.updatePixelVal(pixelNum);
                    }}
                    onMouseLeave={() => { this.setState({ mouseDown: false }) }}
                    className='pixelGrid'>
                    {pixelRows}
                </div>
                {/* <button onClick={this.printArray}> Light It Up! </button> */}
            </div>
        )
    }
}

export default PixelGrid;