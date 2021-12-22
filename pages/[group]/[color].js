import React from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Blurhash } from "react-blurhash";
import pickRandom from "../../utils/pickRandom";
import CONFIG from "../../config";
import { getColorsData, getRandomQueryColor } from "../../utils";
import { Logo, PageWrapper } from "../../components";
import useWindowSize from "../../hooks/useWindowSize";

const ColorPage = ({ photo, color }) => {
	const [isLoading, setIsLoading] = React.useState(true);

	const { windowSize } = useWindowSize();

	const handleSetIsLoading = (loading) => setIsLoading(loading);

	const { prettyName, colorGroup, hex, rgbString } = color;

	const appName = "Swatches";

	return (
		<PageWrapper pageTitle={prettyName} colorGroup={colorGroup} displayNav={windowSize <= 750} displayFooter={false}>
			<div className="color-page" style={{ backgroundColor: color.hex }}>
				<div className="color-page__image-wrapper">
					<p className="color-page__attribution">
						Photo by{" "}
						<a href={`${photo.user.links.html}?utm_source=${appName}&utm_medium=referral`}>{photo.user.name}</a> on{" "}
						<a href={`https://unsplash.com/?utm_source=${appName}&utm_medium=referral`}>Unsplash</a>
					</p>
					<div className="color-page__image">
						{isLoading && (
							<Blurhash hash={photo.blur_hash} width={400} height={500} resolutionX={32} resolutionY={32} punch={1} />
						)}
						<Image
							src={photo.urls.regular}
							alt={photo.alt_description}
							layout="fill"
							onLoadingComplete={() => handleSetIsLoading(false)}
						/>
					</div>
				</div>
				<div className="color-page__details">
					<div className="color-page__details-wrapper">
						<header className="color-page__header">
							<h1 className="color-page__name">{prettyName}</h1>
							<h2 className="color-page__color-group">Collection: {colorGroup}</h2>
							{windowSize > 750 && (
								<div className="color-page__logo">
									<Logo />
								</div>
							)}
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
						<div className="button-row">
							<Link href="/">
								<a className="color-page__link">
									<span className="icon">
										<BsArrowLeft />
									</span>
									<span>All colors</span>
								</a>
							</Link>
							<Link href={`/${colorGroup}`}>
								<a className="color-page__link">
									<span>{colorGroup}</span>
									<span className="icon">
										<BsArrowRight />
									</span>
								</a>
							</Link>
						</div>
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
		props: {
			color: colors.find((c) => c.name === color),
			photo: pickRandom(photos.results),
		},
	};
};