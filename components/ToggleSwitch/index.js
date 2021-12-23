/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Switch from "react-switch";
import { useDarkMode } from "next-dark-mode";

const ToggleSwitch = () => {
	const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();

	const handleToggleTheme = () => {
		if (darkModeActive) {
			switchToLightMode();
		} else {
			switchToDarkMode();
		}
	};

	return (
		<form className="toggle-switch">
			<label htmlFor="toggle-switch" className="toggle-switch__label">
				<Switch
					checked={darkModeActive}
					onChange={handleToggleTheme}
					onColor={darkModeActive ? "#224b6b" : "#86d3ff"}
					offColor={darkModeActive ? "#86d3ff" : "#ad402a"}
					onHandleColor="#186fb3"
					offHandleColor={darkModeActive ? "#fff" : "#FF4C29"}
					handleDiameter={24}
					uncheckedIcon={false}
					checkedIcon={false}
					checkedHandleIcon={<MdDarkMode />}
					uncheckedHandleIcon={<MdLightMode />}
					boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
					activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
					height={18}
					width={36}
					className="toggle-switch__input"
					id="toggle-switch"
				/>
			</label>
		</form>
	);
};

export default ToggleSwitch;
