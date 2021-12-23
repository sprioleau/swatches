import axios from "axios";
import cheerio from "cheerio";
import camelToTitleCase from "./camelToTitleCase";

const getColorsData = async () => {
	try {
		const { data: html } = await axios.get("https://htmlcolorcodes.com/color-names/");
		const colors = [];
		const options = { xml: { normalizeWhitespace: true } };
		const $ = cheerio.load(html, options);

		$(".color-group").each((_, group) => {
			const colorGroup = $(group).find(".color-group__title").text().replace(" HTML Color Names", "s");

			$(group)
				.find("tbody .color-table__row")
				.each((__, row) => {
					const name = $(row).find(".color-table__cell--name").text();
					const hex = $(row).find(".color-table__cell--hex").text();
					const rgbString = $(row).find(".color-table__cell--rgb").text();
					const rgb = rgbString.replace("rgb(", "").replace(")", "");
					const [r, g, b] = rgb.split(", ").map((l) => parseInt(l, 10));

					const color = {
						colorGroup: colorGroup.toLowerCase(),
						name: name.toLowerCase(),
						prettyName: camelToTitleCase(name),
						hex,
						rgbString: rgb,
						rgb: {
							red: r,
							green: g,
							blue: b,
						},
					};

					const isTroublesome = name === "IndianRed";

					const colorExists = colors.find((c) => c.name === name);

					if (!colorExists && !isTroublesome) {
						colors.push(color);
					}
				});
		});

		// res.status(200).json(colors);

		return colors;
	} catch (error) {
		// res.status(500).json(error);
		return error;
	}
};

export default getColorsData;
