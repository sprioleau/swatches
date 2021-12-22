import React from "react";
import ColorSwatch from "../ColorSwatch";
import ColorGroup from "../ColorGroup";
import { getColorsByGroup } from "../../utils";

const ColorGrid = ({ colors, includeBackButton }) => {
	const colorsByGroup = getColorsByGroup(colors);

	return (
		<div className="color-grid">
			<ul className="color-grid__list">
				{Object.entries(colorsByGroup).map(([colorGroupLabel, colorsInGroup]) => {
					return (
						<React.Fragment key={colorGroupLabel}>
							<li className="color-grid__list-item color-group">
								<ColorGroup
									groupLabel={colorGroupLabel}
									colorsInGroup={colorsInGroup}
									includeBackButton={includeBackButton}
								/>
							</li>
							{colorsInGroup.map((color) => (
								<li key={color.name} className="color-grid__list-item">
									<ColorSwatch color={color} />
								</li>
							))}
						</React.Fragment>
					);
				})}
				{Array.from(Array(16).keys()).map((key) => (
					<li key={key} className="color-grid__list-item hidden" />
				))}
			</ul>
		</div>
	);
};

export default ColorGrid;
