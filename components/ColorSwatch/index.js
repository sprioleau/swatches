import React from "react";
import { useRouter } from "next/router";
import { selectSetSelectedColor } from "../../store/selectors";
import useStore from "../../store";

const ColorSwatch = ({ color }) => {
	const { name, prettyName, hex, rgbString } = color;
	const router = useRouter();
	const setSelectedColor = useStore(selectSetSelectedColor);

	const handleClick = (e) => {
		setSelectedColor(color);
		router.push(`colors/${name}`);
	};

	return (
		<div className="color-swatch" onClick={handleClick} role="button" tabIndex={0} aria-label="color button">
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
		</div>
	);
};

export default ColorSwatch;
