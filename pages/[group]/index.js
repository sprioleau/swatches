/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getColorsData, lowerToSentenceCase } from "../../utils";
import { ColorGrid, PageWrapper } from "../../components";
import getColorsByGroup from "../../utils/getColorsByGroup";

const GroupsPage = ({ groupColors, group }) => {
	const groupTitle = lowerToSentenceCase(group);

	return (
		<PageWrapper pageTitle={groupTitle} colorGroup={group}>
			<div className="group-page">
				<h1 className="group-page__title">{groupTitle}</h1>
				<ColorGrid colors={groupColors} includeBackButton />
			</div>
		</PageWrapper>
	);
};

export default GroupsPage;

export async function getStaticPaths() {
	const colors = await getColorsData();

	const groups = colors.reduce((result, { colorGroup }) => {
		if (!result.includes(colorGroup)) {
			result.push(colorGroup);
		}
		return result;
	}, []);

	const paths = groups.map((group) => {
		return {
			params: {
				group,
			},
		};
	});

	return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
	const { group } = params;
	const colors = await getColorsData();
	const colorsByGroup = getColorsByGroup(colors);

	return {
		props: {
			group,
			groupColors: colorsByGroup[group],
		},
	};
};
