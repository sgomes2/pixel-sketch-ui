import { useState } from "react";
import { LED_COLORS, ALL_COLORS, UI_MODES} from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick, uiMode, screenSize } = props;
    const {width, height} = screenSize;

    const pixelSize = Math.floor(Math.min(height, width) * .6 / 12);

    const [selectedColor, setSelectedColor] = useState(0);

    const selectColor = (color) => {
        setSelectedColor(color);
        onClick(color);
    }

    const colorMode = uiMode === UI_MODES.STANDALONE ? ALL_COLORS : LED_COLORS;

    const availableColors = colorMode.map((color, index) => {
        return (
        <div
            onClick={() => {selectColor(index)}}
            key={color}
            style={{
                backgroundColor: `${color}`,
                minHeight: `${pixelSize}px`, maxHeight: `${pixelSize}px`,
                minWidth: `${pixelSize}px`, maxWidth: `${pixelSize}px`,
            }}
            className={`cell ${color === colorMode[selectedColor] ? 'selected' : null }`}
        />
        )
    })

    return (
        <div className="colorPicker">
            {availableColors}
        </div>
    )
}

export default ColorPicker;