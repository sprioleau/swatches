/* eslint-disable no-param-reassign */
import React from "react";
import ColorSwatch from "../ColorSwatch";
import Arrow from "../Arrow";
import useStore from "../../store";
import { selectColors, selectSetColors } from "../../store/selectors";

const ColorGrid = (props) => {
	const [activeColor, setActiveColor] = React.useState(null);
	const colors = useStore(selectColors);
	const setColors = useStore(selectSetColors);

	React.useEffect(() => {
		setColors(props.colors);
	}, [props.colors, setColors]);

	const displayedColors = colors.reduce((result, color) => {
		if (!result[color.colorGroup]) {
			result[color.colorGroup] = [color];
		} else {
			result[color.colorGroup] = [...result[color.colorGroup], color];
		}
		return result;
	}, {});

	return (
		<div className="color-grid">
			<ul className="color-grid__list">
				{Object.entries(displayedColors).map(([colorGroupLabel, colorsInGroup]) => {
					return (
						<React.Fragment key={colorGroupLabel}>
							<li className="color-grid__list-item color-group">
								<h3 className="color-grid">{colorGroupLabel}</h3>
								<Arrow color={colorsInGroup[Math.floor(colorsInGroup.length / 1.7)].hex} />
							</li>
							{colorsInGroup.map((color) => (
								<li key={color.name} className="color-grid__list-item">
									<ColorSwatch color={color} activeColor={activeColor} setActiveColor={setActiveColor} />
								</li>
							))}
						</React.Fragment>
					);
				})}
				{Array.from(Array(16).keys()).map((key) => (
					<li key={key} className="color-grid__list-item" style={{ visibility: "hidden" }} />
				))}
			</ul>
		</div>
	);
};

export default ColorGrid;
