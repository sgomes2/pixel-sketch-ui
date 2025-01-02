import { useState } from "react";
import { LED_COLORS, ALL_COLORS, UI_MODES } from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick, uiMode, screenSize } = props;
    const { width, height } = screenSize;

    const sketchGridWidth = Math.floor((Math.min(height, width)) * .8);

    console.log(`Grid Height: ${height}, Grid Width: ${width}`);

    const [selectedColor, setSelectedColor] = useState("White");

    const selectColor = (color) => {
        setSelectedColor(color);
        onClick(color);
    }

    const colorMode = uiMode === UI_MODES.STANDALONE ? ALL_COLORS : LED_COLORS;

    const pixelSize = Math.floor((sketchGridWidth * .8) / 12);

    const availableColors = colorMode.map((colorPallet) => {
        return (
            <div>
                {colorPallet.map((color, index) => {
                    return (
                        <div
                            onClick={() => { selectColor(color) }}
                            key={color}
                            style={{
                                backgroundColor: `${color}`,
                                minHeight: `${pixelSize}px`, maxHeight: `${pixelSize}px`,
                                minWidth: `${pixelSize}px`, maxWidth: `${pixelSize}px`,
                                float: `${index === 0 ? 'inline-start' : 'left'}`,
                            }}
                            className={`cell ${color === selectedColor ? 'selected' : null}`}
                        />
                    )
                })}
            </div>
        )
    })

    return (
        <div className="colorPicker" style={{
            minWidth: `${sketchGridWidth + 20}px`,
            maxWidth: `${sketchGridWidth + 20}px`,
            minHeight: `${pixelSize * colorMode.length}px`,
        }}>
            {availableColors}
        </div>

    )
}

export default ColorPicker;