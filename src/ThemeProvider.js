import { createContext, useContext, useState } from 'react';

const Theme = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);
	return (
		<Theme.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</Theme.Provider>
	);
};

const ThemeState = () => useContext(Theme);
export default ThemeState;
