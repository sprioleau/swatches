const camelToTitleCase = (string) => {
	const withSpaces = string.replace(/([A-Z])/g, " $1");
	const titleCase = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
	return titleCase.trim();
};

export default camelToTitleCase;
