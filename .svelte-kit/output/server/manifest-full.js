export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.ico"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon"},
	_: {
		entry: {"file":"_app/immutable/start-90aec121.js","imports":["_app/immutable/start-90aec121.js","_app/immutable/chunks/index-188eb586.js","_app/immutable/chunks/singletons-518bd6c0.js","_app/immutable/chunks/index-de9ade72.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/experience",
				pattern: /^\/experience\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/experience/updaterecord",
				pattern: /^\/experience\/updaterecord\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/experience/updaterecord/_server.js')
			},
			{
				id: "/foodlog/[date]",
				pattern: /^\/foodlog\/([^/]+?)\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/foodlog/[date]/updaterecord",
				pattern: /^\/foodlog\/([^/]+?)\/updaterecord\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/foodlog/_date_/updaterecord/_server.js')
			},
			{
				id: "/foodlog/[date]/updatetargettotals",
				pattern: /^\/foodlog\/([^/]+?)\/updatetargettotals\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/foodlog/_date_/updatetargettotals/_server.js')
			},
			{
				id: "/protected",
				pattern: /^\/protected\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/reference",
				pattern: /^\/reference\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/reference/updaterecord",
				pattern: /^\/reference\/updaterecord\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/reference/updaterecord/_server.js')
			},
			{
				id: "/traininglog/[date]",
				pattern: /^\/traininglog\/([^/]+?)\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/traininglog/[date]/updaterecord",
				pattern: /^\/traininglog\/([^/]+?)\/updaterecord\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./entries/endpoints/traininglog/_date_/updaterecord/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
