import Logo from "../Logo";
import useWindowSize from "../../hooks/useWindowSize";

const Nav = () => {
	const { windowSize } = useWindowSize();

	return (
		<nav className="nav">
			<div className="nav__container container">
				<Logo small={windowSize < 500} />
				<p className="nav__credit">
					<span>by </span>
					<a href="https://github.com/sprioleau" rel="noreferrer" target="_blank">
						San&apos;Quan Prioleau
					</a>
				</p>
			</div>
		</nav>
	);
};

export default Nav;
