import { colorGroupToColorQuery } from "../constants";
import pickRandom from "./pickRandom";

const getColorForQuery = (colorGroupName) => {
	const options = colorGroupToColorQuery[colorGroupName];
	if (options.length === 1) return options[0];
	return pickRandom(options);
};

export default getColorForQuery;
