import { useState } from "react";
import { Colors } from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick } = props;

    const [selectedColor, setSelectedColor] = useState(Colors[0]);

    const selectColor = (color) => {
        setSelectedColor(color);
        onClick(color);
    }

    const availableColors = Colors.map((color) => {
        return (
        <div
            onClick={() => {selectColor(color)}}
            key={color}
            style={{backgroundColor: `rgb${color}`}}
            className={`cell ${color === selectedColor ? 'selected' : null }`}
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