import { Colors } from "../../constants/constants";
import './ColorPicker.css'

function ColorPicker(props) {
    const { onClick } = props;

    const availableColors = Object.keys(Colors).map((color) => {
        return (<div onClick={() => {onClick(Colors[color])}} key={color} style={{backgroundColor: Colors[color]}} className="cell"/>)
    })

    return (
        <div>
            {availableColors}
        </div>
    )
}

export default ColorPicker;