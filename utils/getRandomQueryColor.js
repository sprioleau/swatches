import { colorGroupToColorQuery, validColors } from "../constants";
import pickRandom from "./pickRandom";

const getRandomQueryColor = (colors, colorName) => {
	const colorData = colors.find((c) => c.name === colorName);

	if (colorData) {
		return pickRandom(colorGroupToColorQuery[colorData.colorGroup]);
	} else {
		return pickRandom(validColors);
	}
};

export default getRandomQueryColor;
