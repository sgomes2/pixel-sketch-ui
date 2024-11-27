import { useState } from "react";
import { Colors } from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick } = props;

    const [selectedColor, setSelectedColor] = useState(0);

    const selectColor = (color) => {
        setSelectedColor(color);
        onClick(color);
    }

    const availableColors = Colors.map((color, index) => {
        return (
        <div
            onClick={() => {selectColor(index)}}
            key={color}
            style={{backgroundColor: `${color}`}}
            className={`cell ${color === Colors[selectedColor] ? 'selected' : null }`}
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