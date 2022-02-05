import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet="UTF-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<link rel="icon" href="/favicon.png" />
					<meta name="description" content="The most beautiful way to see HTML colors in context." />
					<meta itemProp="name" content="Swatches" />
					<meta itemProp="description" content="The most beautiful way to see HTML colors in context." />
					<meta itemProp="image" content="https://html-swatches.vercel.app/images/social-card.png" />
					<meta property="og:url" content="https://html-swatches.vercel.app" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Swatches" />
					<meta property="og:description" content="The most beautiful way to see HTML colors in context." />
					<meta property="og:image" content="https://html-swatches.vercel.app/images/social-card.png" />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content="Swatches" />
					<meta name="twitter:description" content="The most beautiful way to see HTML colors in context." />
					<meta name="twitter:image" content="https://html-swatches.vercel.app/images/social-card.png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
