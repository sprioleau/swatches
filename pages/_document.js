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
