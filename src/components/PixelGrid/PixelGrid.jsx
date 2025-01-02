import React from 'react';
import './PixelGrid.css'
import { LED_COLORS, ALL_COLORS, UI_MODES } from '../../constants/constants'

class PixelGrid extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.getPixel = this.getPixel.bind(this);
        this.getPixelRow = this.getPixelRow.bind(this); 
        this.updatePixelVal = this.updatePixelVal.bind(this);
        this.ref = React.createRef();
    }

    updatePixelVal(pixelNum) {
        const { selectedColor, updateGridValues, gridValues } = this.props;

        // console.log(`Setting Pixel ${pixelNum}:${selectedColor}`);
        
        updateGridValues({...gridValues, [pixelNum]: selectedColor});
    }

    getPixel(pixelNum, pixelSize) {
        const { mouseDown } = this.state
        const { gridValues } = this.props

        const color = gridValues[pixelNum];

        return (
            <div 
                key={`pixel-${pixelNum}`}
                onClick={() => {this.updatePixelVal(pixelNum)}}
                onMouseOver={() => { if (mouseDown) {this.updatePixelVal(pixelNum)}}}
                style={{
                    backgroundColor: color !== undefined ? `${color}` : 'Black',
                    minHeight: `${pixelSize}px`, maxHeight: `${pixelSize}px`,
                    minWidth: `${pixelSize}px`, maxWidth: `${pixelSize}px`,
                }}
                className='pixel'
            />
        )
    }

    getPixelRow(rowNum, pixelSize) {
        const numPixels = 16;
    
        const pixels = [];
    
        for (let i = 1; i <= numPixels; i++) {
            if (rowNum % 2 === 0) {
                pixels.push(this.getPixel((numPixels * rowNum) + (numPixels - i), pixelSize));
            } else {
                pixels.push(this.getPixel((numPixels * rowNum) + (i-1), pixelSize));
            }
        }
    
        return (
            <div key={`Pixel_Row_${rowNum}`} className='pixelRow'>
                {pixels}
            </div>
        )
    }

    render() {
        const {screenSize, gridSize} = this.props
        const {width, height} = screenSize;

        const pixelRows = [];

        const pixelSize = Math.floor(Math.min(height, width) * .8 / gridSize);
    
        for (let i = 0; i < gridSize; i++) {
            pixelRows.push(this.getPixelRow(i, pixelSize));
        }
        return (
            <div>
                <div 
                onMouseDown={() => {this.setState({...this.state, mouseDown: true})}}
                onMouseUp={() => {this.setState({...this.state, mouseDown: false})}}
                className='pixelGrid'>
                    {pixelRows}  
                </div>
                {/* <button onClick={this.printArray}> Light It Up! </button> */}
            </div>
        )
    }   
}

export default PixelGrid;