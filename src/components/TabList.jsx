import ThemeState from '../ThemeProvider';

const TabList = ({ config, className, activeTab, setActiveTab }) => {
	const { darkMode } = ThemeState();
	return (
		<div
			className={`flex gap-4 items-center max-sm:shadow-sm text-sm ${
				darkMode
					? 'bg-dark-blue-200 text-dark-blue-500'
					: 'text-light-blue-400 bg-white'
			} ${className}`}
		>
			{config.map((entry, index) => (
				<p
					onClick={() => setActiveTab(index)}
					className={`${
						activeTab === index
							? 'text-blue-primary font-bold'
							: `${
									darkMode
										? 'hover:text-dark-blue-400'
										: 'hover:text-light-blue-500'
							  }`
					}`}
					key={index}
				>
					{entry.header}
				</p>
			))}
		</div>
	);
};

export default TabList;
