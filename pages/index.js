import React from "react";
import Head from "next/head";
import { Header, ColorGrid, PageWrapper } from "../components";
import getColorsData from "../utils/getColorsData";

const Home = ({ colors }) => {
	return (
		<PageWrapper pageTitle="Swatches">
			<Head>
				<title>Swatches</title>
			</Head>
			<Header />
			<ColorGrid colors={colors} />
		</PageWrapper>
	);
};

export default Home;

export const getStaticProps = async (context) => {
	const colors = await getColorsData();

	return {
		props: { colors },
	};
};
