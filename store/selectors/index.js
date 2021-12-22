export const selectColors = (state) => state.colors;
export const selectSetColors = (state) => state.setColors;
export const selectColorData = (state, colorName) => state.colors.find((color) => color.name === colorName);