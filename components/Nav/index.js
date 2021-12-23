import React from "react";
import Logo from "../Logo";
import useWindowSize from "../../hooks/useWindowSize";
import ToggleSwitch from "../ToggleSwitch";

const Nav = () => {
	const { windowSize } = useWindowSize();

	return (
		<nav className="nav">
			<div className="nav__container container">
				<Logo small={windowSize < 500} />
				<div className="nav__main-contents-wrapper">
					<p className="nav__credit">
						<span>by </span>
						<a href="https://github.com/sprioleau" rel="noreferrer" target="_blank">
							San&apos;Quan Prioleau
						</a>
					</p>
					<ToggleSwitch />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
