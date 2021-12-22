import Head from "next/head";
import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";

const PageWrapper = ({ pageTitle, colorGroup, displayNav = true, displayFooter = true, children }) => {
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<link rel="icon" href={colorGroup ? `/favicons/${colorGroup}.png` : "/favicon.png"} />
			</Head>
			{displayNav && <Nav />}
			<main className={`main ${!displayNav ? "hide-nav" : ""}`.trim()}>{children}</main>
			{displayFooter && <Footer />}
		</>
	);
};

export default PageWrapper;
