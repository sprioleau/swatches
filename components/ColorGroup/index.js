import Link from "next/link";
import React from "react";
import Arrow from "../Arrow";

const ColorGroup = ({ groupLabel, colorsInGroup, includeBackButton = false }) => {
	const getArrowColor = (groupColors) => {
		return groupColors[Math.floor(colorsInGroup.length / 1.7)].hex;
	};

	const href = includeBackButton ? "/" : `/${groupLabel}`;

	return (
		<Link href={href} className="color-group" role="button" tabIndex={0} aria-label="group button" passHref>
			<a className="color-group__link link-wrapper">
				{includeBackButton ? (
					<>
						<h2 className="color-group__label">All colors</h2>
						<Arrow color={getArrowColor(colorsInGroup)} back />
					</>
				) : (
					<>
						<h2 className="color-group__label">{groupLabel}</h2>
						<Arrow color={getArrowColor(colorsInGroup)} />
					</>
				)}
			</a>
		</Link>
	);
};

export default ColorGroup;
