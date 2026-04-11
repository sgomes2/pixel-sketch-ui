import { useState } from "react";
import { LED_COLORS, ALL_COLORS, UI_MODES } from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick, uiMode, gridWidth } = props;

    const [selectedColor, setSelectedColor] = useState("#FFFFFF");

    const selectColor = (color) => {
        setSelectedColor(color);
        onClick(color);
    }

    const colorMode = uiMode === UI_MODES.STANDALONE ? ALL_COLORS : LED_COLORS;

    const cellsPerRow = 16;
    const cellMargin = 4; // 2px each side
    const pickerPadding = 20; // 10px each side
    const cellSize = Math.floor((gridWidth - pickerPadding - cellsPerRow * cellMargin) / cellsPerRow);

    const allColors = colorMode.flat();
    const colorRows = [];
    for (let i = 0; i < allColors.length; i += cellsPerRow) {
        colorRows.push(allColors.slice(i, i + cellsPerRow));
    }

    const availableColors = colorRows.map((row, rowIndex) => (
        <div key={rowIndex} className="colorRow">
            {row.map((color) => (
                <div
                    onClick={() => { selectColor(color) }}
                    key={color}
                    style={{ backgroundColor: color }}
                    className={`cell ${color === selectedColor ? 'selected' : ''}`}
                />
            ))}
        </div>
    ))

    return (
        <div className="colorPicker" style={{ '--cell-size': `${cellSize}px`, width: `${gridWidth}px` }}>
            {availableColors}
        </div>
    )
}

export default ColorPicker;
