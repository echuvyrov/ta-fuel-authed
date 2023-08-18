export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.ico","naturalbbevents.hml"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon"},
	_: {
		client: {"start":"_app/immutable/entry/start.34ed9c4d.js","app":"_app/immutable/entry/app.2b6d88e9.js","imports":["_app/immutable/entry/start.34ed9c4d.js","_app/immutable/chunks/index.4bd8640c.js","_app/immutable/chunks/singletons.51925275.js","_app/immutable/chunks/index.fd763c3b.js","_app/immutable/entry/app.2b6d88e9.js","_app/immutable/chunks/index.4bd8640c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/@[nickname]/[[date]]/foodlog",
				pattern: /^\/@([^/]+?)(?:\/([^/]+))?\/foodlog\/?$/,
				params: [{"name":"nickname","optional":false,"rest":false,"chained":false},{"name":"date","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/@[nickname]/[[date]]/traininglog",
				pattern: /^\/@([^/]+?)(?:\/([^/]+))?\/traininglog\/?$/,
				params: [{"name":"nickname","optional":false,"rest":false,"chained":false},{"name":"date","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/@[nickname]/[[date]]",
				pattern: /^\/@([^/]+?)(?:\/([^/]+))?\/?$/,
				params: [{"name":"nickname","optional":false,"rest":false,"chained":false},{"name":"date","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/experience/updaterecord",
				pattern: /^\/experience\/updaterecord\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/experience/updaterecord/_server.js'))
			},
			{
				id: "/experience/[date]",
				pattern: /^\/experience\/([^/]+?)\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/foodlog/[date]",
				pattern: /^\/foodlog\/([^/]+?)\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/foodlog/[date]/generatefoodsuggestions",
				pattern: /^\/foodlog\/([^/]+?)\/generatefoodsuggestions\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/foodlog/_date_/generatefoodsuggestions/_server.js'))
			},
			{
				id: "/foodlog/[date]/updaterecord",
				pattern: /^\/foodlog\/([^/]+?)\/updaterecord\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/foodlog/_date_/updaterecord/_server.js'))
			},
			{
				id: "/foodlog/[date]/updatetargettotals",
				pattern: /^\/foodlog\/([^/]+?)\/updatetargettotals\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/foodlog/_date_/updatetargettotals/_server.js'))
			},
			{
				id: "/naturalbbevents",
				pattern: /^\/naturalbbevents\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/protected",
				pattern: /^\/protected\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/reference",
				pattern: /^\/reference\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/reference/updaterecord",
				pattern: /^\/reference\/updaterecord\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/reference/updaterecord/_server.js'))
			},
			{
				id: "/traininglog/[date]",
				pattern: /^\/traininglog\/([^/]+?)\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/traininglog/[date]/updaterecord",
				pattern: /^\/traininglog\/([^/]+?)\/updaterecord\/?$/,
				params: [{"name":"date","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/traininglog/_date_/updaterecord/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
