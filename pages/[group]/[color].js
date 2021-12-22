/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";
import { Blurhash } from "react-blurhash";
import pickRandom from "../../utils/pickRandom";
import CONFIG from "../../config";
import { selectColorData } from "../../store/selectors";
import useStore from "../../store";
import { getColorsData, getRandomQueryColor } from "../../utils";
import { PageWrapper } from "../../components";

const ColorPage = ({ photo }) => {
	const { query } = useRouter();
	const { color } = query;

	const [isLoading, setIsLoading] = React.useState(true);

	const handleSetIsLoading = (loading) => setIsLoading(loading);

	const colorData = useStore((state) => selectColorData(state, color));

	if (!colorData) return null;

	const { prettyName, colorGroup, hex, rgbString } = colorData;

	return (
		<PageWrapper pageTitle={prettyName} colorGroup={colorGroup} displayNav={false} displayFooter={false}>
			<div className="color-page" style={{ backgroundColor: color ?? "var(--ui-bg)" }}>
				<div className="color-page__image-wrapper">
					<div className="color-page__image">
						{isLoading && (
							<Blurhash hash={photo.blur_hash} width={400} height={500} resolutionX={32} resolutionY={32} punch={1} />
						)}
						<Image
							src={photo.urls.regular}
							alt={photo.alt_description}
							layout="fill"
							onLoadingComplete={() => handleSetIsLoading(false)}
							style={{ opacity: isLoading ? 0 : 1 }}
						/>
					</div>
				</div>
				<div className="color-page__details">
					<div className="color-page__details-wrapper">
						<header className="color-page__header">
							<h1 className="color-page__name">{prettyName}</h1>
							<h2 className="color-page__color-group">Collection: {colorGroup}</h2>
						</header>
						<ul className="color-page__color-values">
							<li className="color-page__color-value">
								<p className="color-page__value">{hex}</p>
								<p className="color-page__label">Hex value</p>
							</li>
							<li className="color-page__color-value">
								<p className="color-page__value">{rgbString}</p>
								<p className="color-page__label">RGB values</p>
							</li>
						</ul>
						<Link href="/">
							<a className="no-hover color-page__back-button">
								<button type="button">
									<span className="icon">
										<BsArrowLeft />
									</span>
									<span>All swatches</span>
								</button>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default ColorPage;

export async function getStaticPaths() {
	const colors = await getColorsData();

	const paths = colors.map(({ name, colorGroup }) => {
		return {
			params: {
				color: name,
				group: colorGroup,
			},
		};
	});

	return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
	const colors = await getColorsData();
	const { color } = params;

	const imageColor = getRandomQueryColor(colors, color);
	const API_ROOT_URL = "https://api.unsplash.com/search/photos/";
	const url = new URL(API_ROOT_URL);

	url.searchParams.append("query", "color");
	url.searchParams.append("content_filter", "high");
	url.searchParams.append("color", imageColor);
	url.searchParams.append("orientation", "portrait");
	url.searchParams.append("client_id", process.env.UNSPLASH_API_ACCESS_KEY);

	const isDevelopment = process.env.NODE_ENV === "development";

	const requestUrl = isDevelopment && !CONFIG.USE_API ? "http://localhost:3000/api/getSimilarImages" : url.href;

	const { data: photos } = await axios.get(requestUrl);

	return {
		props: { photo: pickRandom(photos.results) },
	};
};
