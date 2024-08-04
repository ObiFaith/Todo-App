import { nanoid } from "nanoid";

export const todos = [
	{
		id: nanoid(),
		title: 'Create the api for my Todo project',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'Go through the ThreeJS video in freecodecamp channel on YouTube',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'Learn about RTK query and Zustand for State Management',
		completed: false,
	},
];