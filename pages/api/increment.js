import axios from "axios";

export default async function handler(req, res) {
	const { increment_link: incrementLink } = req.body.data;

	try {
		axios.get(incrementLink, {
			headers: {
				Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
			},
		});
		res.status(200).json({ message: "ok" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
}
