import exampleResponse from "../../constants/exampleResponse";

export default async function handler(req, res) {
	res.status(200).json(exampleResponse);
}
