const getUnsplashRequestUrl = (color) => {
	const API_ROOT_URL = "https://api.unsplash.com/search/photos/";
	const url = new URL(API_ROOT_URL);

	const queryParams = {
		query: "color",
		content_filter: "high",
		per_page: 20,
		color,
		orientation: "portrait",
		client_id: process.env.UNSPLASH_API_ACCESS_KEY,
	};

	for (const key in queryParams) {
		if (queryParams[key]) url.searchParams.append(key, queryParams[key]);
	}

	return url.href;
};

export default getUnsplashRequestUrl;
