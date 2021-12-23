import Head from "next/head";
import React from "react";
import { useDarkMode } from "next-dark-mode";
import Nav from "../Nav";
import Footer from "../Footer";

const PageWrapper = ({ pageTitle, colorGroup, children }) => {
	const { darkModeActive } = useDarkMode();
	const theme = darkModeActive ? "dark" : "light";

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<link rel="icon" href={colorGroup ? `/favicons/${colorGroup}.png` : "/favicon.png"} />
			</Head>
			<div className="app" data-theme={theme}>
				<Nav />
				<main className="main">{children}</main>
				<Footer />
			</div>
		</>
	);
};

export default PageWrapper;
