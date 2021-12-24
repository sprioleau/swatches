import axios from "axios";

const handleIncrementDownloadCounter = async (selectedPhoto) => {
	try {
		axios.post("/api/increment", {
			data: {
				increment_link: selectedPhoto.links.download_location,
			},
		});
	} catch (error) {
		console.error(error);
	}
};

export default handleIncrementDownloadCounter;
