import React from "react";
import Link from "next/link";

const ColorSwatch = ({ color }) => {
	const { name, prettyName, hex, rgbString, colorGroup } = color;

	return (
		<Link
			href={`${colorGroup}/${name}`}
			className="color-swatch"
			role="button"
			tabIndex={0}
			aria-label="color button"
			passHref
		>
			<a className="color-swatch__link link-wrapper">
				<div
					className="color-swatch__swatch"
					data-name={name}
					data-hex={hex}
					data-rgb={rgbString}
					style={{ backgroundColor: hex }}
				/>
				<div className="color-swatch__details">
					<h3 className="color-swatch__label">SWATCH</h3>
					<h3 className="color-swatch__hex">{hex.substring(1).toUpperCase()}</h3>
					<h3 className="color-swatch__name">{prettyName}</h3>
				</div>
			</a>
		</Link>
	);
};

export default ColorSwatch;
