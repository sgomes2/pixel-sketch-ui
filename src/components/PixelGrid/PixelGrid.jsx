import React from 'react';
import './PixelGrid.css'

class PixelGrid extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.getPixel = this.getPixel.bind(this);
        this.getPixelRow = this.getPixelRow.bind(this); 
        this.updatePixelVal = this.updatePixelVal.bind(this);
    }

    updatePixelVal(pixelNum) {
        const {selectedColor} = this.props;

        this.setState({...this.state, [pixelNum]: selectedColor})
    }

    getPixel(pixelNum) {
        const { [pixelNum]:pixelColor, mouseDown } = this.state

        console.log(`Pixel Num ${pixelNum}: ${pixelColor}`);

        return (
            <div 
                key={`pixel-${pixelNum}`}
                onClick={() => {this.updatePixelVal(pixelNum)}}
                onMouseOver={() => { if (mouseDown) {this.updatePixelVal(pixelNum)}}}
                style={{backgroundColor: pixelColor ? `rgb${pixelColor}` : 'white'}}
                className='pixel'
            />
        )
    }

    getPixelRow(rowNum) {
        const numPixels = 16;
    
        const pixels = [];
    
        for (let i = 0; i < numPixels; i++) {
            pixels.push(this.getPixel((numPixels * rowNum) + i));
        }
    
        return (
            <div className='pixelRow'>
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
            <div 
                onMouseDown={() => {this.setState({...this.state, mouseDown: true})}}
                onMouseUp={() => {this.setState({...this.state, mouseDown: false})}}
                className='pixelGrid'>
              {pixelRows}  
            </div>
        )
    }
    
}

export default PixelGrid;