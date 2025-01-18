import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}
const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={color}
          onChange={onChange}
          className="hex-input"
        />
        <HexColorPicker color={color} onChange={onChange} />
      </div>
    </div>
  );
};

export default ColorPicker;
