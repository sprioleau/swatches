import axios from "axios";

const handleIncrementDownloadCounter = async (selectedPhoto) => {
	try {
		axios.get(selectedPhoto.links.download_location, {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
			},
		});
	} catch (error) {
		console.error(error);
	}
};

export default handleIncrementDownloadCounter;
