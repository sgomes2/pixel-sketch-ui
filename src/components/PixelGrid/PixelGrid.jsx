import React from 'react';
import './PixelGrid.css'
import { LED_COLORS, ALL_COLORS, UI_MODES } from '../../constants/constants'

class PixelGrid extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {};
        this.getPixel = this.getPixel.bind(this);
        this.updatePixelVal = this.updatePixelVal.bind(this);
        this.getPixelFromMouseEvent = this.getPixelFromMouseEvent.bind(this);
    }

    getPixelFromMouseEvent(e, pixelSize, gridSize) {
        const rect = e.currentTarget.getBoundingClientRect();
        const padding = 7;
        const col = Math.floor((e.clientX - rect.left - padding) / pixelSize);
        const row = Math.floor((e.clientY - rect.top - padding) / pixelSize);

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

    getPixel(pixelNum) {
        const { gridValues } = this.props
        const color = gridValues[pixelNum];

        return (
            <div
                key={`pixel-${pixelNum}`}
                style={{ backgroundColor: color !== undefined ? color : 'Black' }}
                className='pixel'
            />
        )
    }

    render() {
        const { screenSize, gridSize } = this.props
        const { width, height } = screenSize;

        const gridPadding = 12; // 6px padding on each side of .pixelGrid
        const pixelSize = Math.floor((Math.min(height, width) - gridPadding) / gridSize);

        const pixels = [];
        for (let row = 0; row < gridSize; row++) {
            for (let i = 1; i <= gridSize; i++) {
                if (row % 2 === 0) {
                    pixels.push(this.getPixel((gridSize * row) + (gridSize - i)));
                } else {
                    pixels.push(this.getPixel((gridSize * row) + (i - 1)));
                }
            }
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
                    style={{ '--pixel-size': `${pixelSize}px`, '--grid-size': gridSize }}
                    className='pixelGrid'>
                    {pixels}
                </div>
                {/* <button onClick={this.printArray}> Light It Up! </button> */}
            </div>
        )
    }
}

export default PixelGrid;
