import React from "react";
import { motion as m } from "framer-motion";

const Arrow = ({ color = null, variant = "filled", back = false }) => {
	return (
		<m.div
			animate={{
				translateX: "10px",
			}}
			transition={{
				duration: 1,
				ease: "easeOut",
				repeat: Infinity,
				repeatType: "reverse",
			}}
			className={`arrow ${back ? "back" : ""}`.trim()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="arrow__icon"
				viewBox="0 0 100 100"
				width="1em"
				height="1em"
				fill={color ?? "currentColor"}
			>
				{variant === "filled" ? (
					<path
						id="arrow"
						d="M0,40H55.33A59.7,59.7,0,0,1,40,0H60a40,40,0,0,0,40,40V60a40,40,0,0,0-40,40H40A59.7,59.7,0,0,1,55.33,60H0Z"
					/>
				) : (
					<path
						id="arrow-line"
						d="M56.18,4A44.08,44.08,0,0,0,96,43.82V56.18A44.08,44.08,0,0,0,56.18,96h-12A55.91,55.91,0,0,1,58.31,62.67l6-6.67H4V44H64.28l-6-6.67A55.91,55.91,0,0,1,44.14,4h12M60,0H40A59.7,59.7,0,0,0,55.33,40H0V60H55.33A59.7,59.7,0,0,0,40,100H60a40,40,0,0,1,40-40V40A40,40,0,0,1,60,0Z"
					/>
				)}
			</svg>
		</m.div>
	);
};

export default Arrow;
