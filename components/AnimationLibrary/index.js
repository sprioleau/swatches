/* eslint-disable import/prefer-default-export */
import React from "react";
import { motion as m } from "framer-motion";

export const FadeInWhenVisible = ({ children }) => {
	const variants = {
		initial: {
			opacity: 0,
			scale: 0,
		},
		animate: {
			opacity: 1,
			scale: 1,
		},
	};

	return (
		<m.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			transition={{ duration: 0.3, delay: 0.5 }}
			variants={variants}
			style={{ width: "100%" }}
		>
			{children}
		</m.div>
	);
};
