/* eslint-disable no-param-reassign */
const getColorsByGroup = (colors) =>
	colors.reduce((result, color) => {
		if (!result[color.colorGroup]) {
			result[color.colorGroup] = [color];
		} else {
			result[color.colorGroup] = [...result[color.colorGroup], color];
		}
		return result;
	}, {});

export default getColorsByGroup;
