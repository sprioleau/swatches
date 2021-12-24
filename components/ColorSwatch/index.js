import React from "react";
import Link from "next/link";
import { motion as m } from "framer-motion";
import Smile from "../Smile";

const ColorSwatch = ({ color }) => {
	const { name, prettyName, hex, rgbString, colorGroup } = color;

	const variants = {
		initial: {
			opacity: 0,
			translateY: 10,
		},
		animate: {
			opacity: 1,
			translateY: 0,
		},
	};

	return (
		<Link
			href={`/${colorGroup}/${name}`}
			className="color-swatch"
			role="button"
			tabIndex={0}
			aria-label="color button"
			passHref
		>
			<a className="color-swatch__link link-wrapper">
				<m.div
					className="color-swatch__animation-wrapper"
					initial="initial"
					whileInView="animate"
					variants={variants}
					viewport={{ once: true }}
					transition={{ duration: 0.3 }}
				>
					<div
						className="color-swatch__swatch"
						data-name={name}
						data-hex={hex}
						data-rgb={rgbString}
						style={{ backgroundColor: hex }}
					/>
					<div className="color-swatch__details">
						<h3 className="color-swatch__label">
							SWATCH
							<span className="smile-icon">
								<Smile />
							</span>
						</h3>
						<h3 className="color-swatch__hex">{hex.substring(1).toUpperCase()}</h3>
						<h3 className="color-swatch__name">{prettyName}</h3>
					</div>
				</m.div>
			</a>
		</Link>
	);
};

export default ColorSwatch;
