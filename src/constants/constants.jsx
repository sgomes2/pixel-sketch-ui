const PRIMARY_COLORS = [
    "#FFFFFF", // White
    "#000000", // Black
    "#FF0000", // Red
    "#FFA500", // Orange
    "#FFFF00", // Yellow
    "#008000", // Green
    "#008080", // Teal
    "#00FFFF", // Cyan
    "#0000FF", // Blue
    "#FF00FF", // Magenta
    "#800080", // Purple
    "#FFC0CB"  // Pink
];
const SECONDARY_COLORS = [
    "#00FF00", // Lime
    "#808000", // Olive
    "#000080", // Navy
    "#800000", // Maroon
    "#FFD700", // Gold
    "#FF7F50", // Coral
    "#FA8072", // Salmon
    "#DC143C", // Crimson
    "#F0E68C", // Khaki
    "#E6E6FA", // Lavender
    "#40E0D0", // Turquoise
    "#4B0082"  // Indigo
];
const TERTIARY_COLORS = [
    "#2F4F4F", // DarkSlateGray
    "#BA55D3", // MediumOrchid
    "#87CEFA", // LightSkyBlue
    "#1E90FF", // DodgerBlue
    "#D2691E", // Chocolate
    "#B8860B"  // DarkGoldenrod
];

module.exports = {
    UI_MODES: Object.freeze({
        STANDALONE: 0,
        LED_ARRAY: 1
    }),
    LED_COLORS: [PRIMARY_COLORS],
    ALL_COLORS: [PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS],
    DEFAULT_COLOR: "#000000"
};