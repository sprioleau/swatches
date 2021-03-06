/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import axios from "axios";
import { motion as m } from "framer-motion";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import CONFIG from "../../config";
import { getColorsData, getRandomQueryColor, handleIncrementDownloadCounter, pickRandom } from "../../utils";
import { PageWrapper, Smile } from "../../components";
import lowerToSentnceCase from "../../utils/lowerToSentenceCase";
import getUnsplashRequestUrl from "../../libs/unsplash";

const ColorPage = ({ photo, color }) => {
	const { prettyName, colorGroup, hex, rgbString } = color;
	const groupTitle = lowerToSentnceCase(colorGroup);
	const appName = "Swatches";

	const variants = {
		initial: {
			opacity: 0,
			translateX: 20,
		},
		animate: {
			opacity: 1,
			translateX: 0,
		},
	};

	return (
		<PageWrapper pageTitle={prettyName} colorGroup={colorGroup}>
			<div className="color-page" style={{ backgroundColor: color.hex }}>
				<div className="color-page__image-wrapper">
					<p className="color-page__attribution">
						Photo by{" "}
						<a href={`${photo.user.links.html}?utm_source=${appName}&utm_medium=referral`}>{photo.user.name}</a> on{" "}
						<a href={`https://unsplash.com/?utm_source=${appName}&utm_medium=referral`}>Unsplash</a>
					</p>
					<m.div
						className="color-page__image-shell-wrapper"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<div className="color-page__image-shell">
							<div className="color-page__image">
								<img src={photo.urls.regular} alt={photo.alt_description} />
								<a
									href={photo.urls.regular}
									download
									target="_blank"
									onClick={() => handleIncrementDownloadCounter(photo)}
									className="color-page__download-link"
									rel="noreferrer"
								>
									<MdOutlineFileDownload />
								</a>
							</div>
						</div>
					</m.div>
				</div>
				<div className="color-page__details-wrapper">
					<m.div
						className="color-page__details"
						initial="initial"
						animate="animate"
						transition={{
							staggerChildren: 0.2,
							delayChildren: 0.5,
						}}
					>
						<m.header className="color-page__header" variants={variants}>
							<h1 className="color-page__name">
								{prettyName}
								<span className="smile-icon">
									<Smile />
								</span>
							</h1>
							<h2 className="color-page__color-group">Collection: {groupTitle}</h2>
						</m.header>
						<m.ul className="color-page__color-values" variants={variants}>
							<li className="color-page__color-value">
								<p className="color-page__value">{hex}</p>
								<p className="color-page__label">hex</p>
							</li>
							<li className="color-page__color-value">
								<p className="color-page__value">{rgbString}</p>
								<p className="color-page__label">rgb</p>
							</li>
						</m.ul>
						<m.div className="button-row" variants={variants}>
							<Link href="/" passHref>
								<a className="color-page__link">
									<span className="icon">
										<BsArrowLeft />
									</span>
									<span>All colors</span>
								</a>
							</Link>
							<Link href={`/${colorGroup}`} passHref>
								<a className="color-page__link">
									<span>{groupTitle}</span>
									<span className="icon">
										<BsArrowRight />
									</span>
								</a>
							</Link>
						</m.div>
					</m.div>
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
	const unsplashRequestUrl = getUnsplashRequestUrl(imageColor);
	const isDevelopment = process.env.NODE_ENV === "development";

	// prettier-ignore
	const requestUrl = isDevelopment && !CONFIG.USE_API
		? "http://localhost:3000/api/get_test_images"
		: unsplashRequestUrl;

	const { data: photos } = await axios.get(requestUrl);

	return {
		props: {
			color: colors.find((c) => c.name === color),
			photo: pickRandom(photos.results),
		},
	};
};
