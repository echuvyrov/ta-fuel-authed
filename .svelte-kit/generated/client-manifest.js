export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8')];

export const server_loads = [0];

export const dictionary = {
	"/": [2],
	"/about": [3],
	"/experience": [~4],
	"/foodlog/[date]": [~5],
	"/protected": [6],
	"/reference": [~7],
	"/traininglog/[date]": [~8]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};