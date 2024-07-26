'use client';
import { Provider } from 'react-redux';
import './globals.css';
import { josefinSans } from './ui/fonts';
import store from '../redux/store';
import ThemeState, { ThemeProvider } from '../ThemeProvider';

export default function RootLayout({ children }) {
	return (
		<ThemeProvider>
			<Content>{children}</Content>
		</ThemeProvider>
	);
}

function Content({ children }) {
	const { darkMode } = ThemeState();
	return (
		<html lang="en">
			<body
				className={`${
					josefinSans.className
				} antialiased scroll-smooth transition-all ${
					darkMode ? 'bg-dark-blue-100' : 'bg-white'
				}`}
			>
				<Provider store={store}>{children}</Provider>
			</body>
		</html>
	);
}