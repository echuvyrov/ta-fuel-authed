const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.ico"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon"},
	_: {
		entry: {"file":"_app/immutable/start-90aec121.js","imports":["_app/immutable/start-90aec121.js","_app/immutable/chunks/index-188eb586.js","_app/immutable/chunks/singletons-518bd6c0.js","_app/immutable/chunks/index-de9ade72.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-1024f395.js'),
			() => import('./chunks/1-13eee695.js'),
			() => import('./chunks/2-43658d23.js'),
			() => import('./chunks/3-7942cedb.js'),
			() => import('./chunks/4-a6773f00.js'),
			() => import('./chunks/5-93bf28b2.js'),
			() => import('./chunks/6-a28efea4.js'),
			() => import('./chunks/7-25c61550.js'),
			() => import('./chunks/8-66a1d352.js')
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
				endpoint: () => import('./chunks/_server-5f495ea7.js')
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
				endpoint: () => import('./chunks/_server-bba1f436.js')
			},
			{
				id: "/foodlog/[date]/updatetargettotals",
				pattern: /^\/foodlog\/([^/]+?)\/updatetargettotals\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server-2e51d172.js')
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
				endpoint: () => import('./chunks/_server-4bb46d3b.js')
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
				endpoint: () => import('./chunks/_server-a1ae34ff.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
