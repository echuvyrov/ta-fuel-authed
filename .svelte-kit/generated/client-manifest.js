export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')];

export const server_loads = [0];

export const dictionary = {
	"/": [2],
	"/@[nickname]/[[date]]/foodlog": [~4],
	"/@[nickname]/[[date]]/traininglog": [~5],
	"/@[nickname]/[[date]]": [~3],
	"/about": [6],
	"/experience/[date]": [~7],
	"/foodlog/[date]": [~8],
	"/protected": [9],
	"/reference": [~10],
	"/traininglog/[date]": [~11]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};