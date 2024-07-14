import React from 'react';
import './PixelGrid.css'
import { Colors } from '../../constants/constants'

class PixelGrid extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.getPixel = this.getPixel.bind(this);
        this.getPixelRow = this.getPixelRow.bind(this); 
        this.updatePixelVal = this.updatePixelVal.bind(this);
    }

    updatePixelVal(pixelNum) {
        const { selectedColor, updateGridValues, gridValues } = this.props;
        
        updateGridValues({...gridValues, [pixelNum]: selectedColor});
    }

    getPixel(pixelNum) {
        const { mouseDown } = this.state
        const { gridValues } = this.props

        const colorIndex = gridValues[pixelNum];

        return (
            <div 
                key={`pixel-${pixelNum}`}
                onClick={() => {this.updatePixelVal(pixelNum)}}
                onMouseOver={() => { if (mouseDown) {this.updatePixelVal(pixelNum)}}}
                style={{backgroundColor: colorIndex !== undefined ? `${Colors[colorIndex]}` : Colors[0]}}
                className='pixel'
            />
        )
    }

    getPixelRow(rowNum) {
        const numPixels = 16;
    
        const pixels = [];
    
        for (let i = 1; i <= numPixels; i++) {
            if (rowNum % 2 === 0) {
                pixels.push(this.getPixel((numPixels * rowNum) + (numPixels - i)));
            } else {
                pixels.push(this.getPixel((numPixels * rowNum) + (i-1)));
            }
            
        }
    
        return (
            <div key={`Pixel_Row_${rowNum}`} className='pixelRow'>
                {pixels}
            </div>
        )
    }

    render() {
        const numRows = 16
        const pixelRows = [];
    
        for (let i = 0; i < numRows; i++) {
            pixelRows.push(this.getPixelRow(i));
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