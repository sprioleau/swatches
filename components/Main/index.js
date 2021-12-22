import React from "react";
import ColorGrid from "../ColorGrid";
import Header from "../Header";

const Main = ({ colors }) => {
	return (
		<main className="main">
			<Header />
			<ColorGrid colors={colors} />
		</main>
	);
};

export default Main;
