import { useState, useEffect } from "react";

export const breakpoints = {
	sm: 576,
	md: 850,
	lg: 1180,
};

const getBreakPoint = (windowWidth) => {
	if (!windowWidth) return undefined;
	switch (windowWidth) {
		case windowWidth < breakpoints.sm:
			return "sm";
		case windowWidth < breakpoints.md:
			return "md";
		case windowWidth < breakpoints.lg:
			return "lg";
		case windowWidth >= breakpoints.lg:
			return "xlg";
		default:
			return "xlg";
	}
};

const useWindowSize = () => {
	const isWindowClient = typeof window === "object";

	const [windowSize, setWindowSize] = useState(isWindowClient ? window.innerWidth : undefined);
	const [breakpoint, setBreakpoint] = useState("");

	useEffect(() => {
		function setSize() {
			setWindowSize(window.innerWidth);
			setBreakpoint(getBreakPoint(window.innerWidth));
		}

		if (isWindowClient) {
			window.addEventListener("resize", setSize);
			return () => window.removeEventListener("resize", setSize);
		}

		return null;
	}, [isWindowClient, setWindowSize]);

	return { windowSize, breakpoint };
};

export default useWindowSize;
