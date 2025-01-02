import { useState } from "react";
import { LED_COLORS, ALL_COLORS, UI_MODES } from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick, uiMode, screenSize } = props;
    const { width, height } = screenSize;

    const sketchGridWidth = Math.floor((Math.min(height, width)) * .75);

    const [selectedColor, setSelectedColor] = useState("#FFFFFF");

    const selectColor = (color) => {
        setSelectedColor(color);
        onClick(color);
    }

    const colorMode = uiMode === UI_MODES.STANDALONE ? ALL_COLORS : LED_COLORS;

    const pixelSize = Math.floor(((sketchGridWidth - 20)) / 14);

    const availableColors = colorMode.map((colorPallet) => {
        return (
            <div>
                {colorPallet.map((color, index) => {
                    const currentlySelected = color === selectedColor
                    return (
                        <div
                            onClick={() => { selectColor(color) }}
                            key={color}
                            style={{
                                backgroundColor: `${color}`,
                                minHeight: `${pixelSize}px`, maxHeight: `${pixelSize}px`,
                                minWidth: `${pixelSize}px`, maxWidth: `${pixelSize}px`,
                            }}
                            className={`cell ${currentlySelected ? 'selected' : ''}`}
                        />
                    )
                })}
            </div>
        )
    })

    return (
        <div className="colorPicker">
            {availableColors}
        </div>
    )
}

export default ColorPicker;