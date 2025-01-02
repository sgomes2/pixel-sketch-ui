const PRIMARY_COLORS = [
    "White",
    "Black",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Teal",
    "Cyan",
    "Blue",
    "Magenta",
    "Purple",
    "Pink",
];
const SECONDARY_COLORS = [
    "Lime",
    "Olive",
    "Navy",
    "Maroon",
    "Gold",
    "Coral",
    "Salmon",
    "Crimson",
    "Khaki",
    "Lavender",
    "Turquoise",
    "Indigo",
];
const TERTIARY_COLORS = [
    "DarkSlateGray",
    "MediumOrchid",
    "LightSkyBlue",
    "DodgerBlue",
    "Chocolate",
    "DarkGoldenrod"
];

module.exports = {
    UI_MODES: Object.freeze({
        STANDALONE: 0,
        LED_ARRAY: 1
    }),
    LED_COLORS: [PRIMARY_COLORS],
    ALL_COLORS: [PRIMARY_COLORS, SECONDARY_COLORS, TERTIARY_COLORS]
};