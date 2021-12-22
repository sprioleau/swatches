import React from "react";
import { Header, ColorGrid, PageWrapper } from "../components";
import getColorsData from "../utils/getColorsData";

const Home = ({ colors }) => {
	return (
		<div className="app">
			<PageWrapper pageTitle="Swatches">
				<Header />
				<ColorGrid colors={colors} />
			</PageWrapper>
		</div>
	);
};

export default Home;

export const getStaticProps = async (context) => {
	const colors = await getColorsData();

	return {
		props: { colors },
	};
};
