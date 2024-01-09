
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const GITHUB_ID: string;
	export const GITHUB_SECRET: string;
	export const AUTH_SECRET: string;
	export const AUTH0_CLIENT_ID: string;
	export const AUTH0_CLIENT_SECRET: string;
	export const AUTH0_DOMAIN: string;
	export const AUTH0_BASE_URL: string;
	export const AUTH0_ISSUER_BASE_URL: string;
	export const TWITTER_KEY: string;
	export const TWITTER_ID: string;
	export const TWITTER_SECRET: string;
	export const GOOGLE_ID: string;
	export const GOOGLE_SECRET: string;
	export const GPT3_API_KEY: string;
	export const POSTGRES_URL: string;
	export const POSTGRES_PRISMA_URL: string;
	export const POSTGRES_URL_NON_POOLING: string;
	export const DATABASE_URL: string;
	export const npm_package_devDependencies_prisma: string;
	export const TERM_PROGRAM: string;
	export const NODE: string;
	export const npm_package_dependencies__auth_sveltekit: string;
	export const INIT_CWD: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_homepage: string;
	export const npm_config_version_git_tag: string;
	export const SHELL: string;
	export const TERM: string;
	export const npm_package_devDependencies_vite: string;
	export const TMPDIR: string;
	export const CONDA_SHLVL: string;
	export const npm_config_init_license: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const TERM_SESSION_ID: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_private: string;
	export const npm_config_registry: string;
	export const npm_package_repository_url: string;
	export const npm_package_readmeFilename: string;
	export const USER: string;
	export const npm_package_description: string;
	export const npm_package_license: string;
	export const npm_package_scripts_check_watch: string;
	export const OPENAI_API_KEY: string;
	export const CONDA_EXE: string;
	export const HOMEBREW_NO_ANALYTICS: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_package_dependencies__prisma_client: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_execpath: string;
	export const npm_package_dependencies__auth_core: string;
	export const npm_package_devDependencies_svelte: string;
	export const MAVEN_OPTS: string;
	export const _CE_CONDA: string;
	export const PATH: string;
	export const npm_config_argv: string;
	export const npm_package_scripts_postinstall: string;
	export const LaunchInstanceID: string;
	export const _: string;
	export const npm_package_dependencies__sveltejs_adapter_node: string;
	export const CONDA_PREFIX: string;
	export const __CFBundleIdentifier: string;
	export const HOMEBREW_HOME: string;
	export const PWD: string;
	export const JAVA_HOME: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_bugs_url: string;
	export const npm_lifecycle_event: string;
	export const npm_package_dependencies__fontsource_fira_mono: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const npm_package_repository_type: string;
	export const npm_package_scripts_build: string;
	export const npm_config_version_commit_hooks: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_svelte_typeahead: string;
	export const npm_config_bin_links: string;
	export const npm_package_dependencies_ag_grid_community: string;
	export const _CE_M: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const SHLVL: string;
	export const HOME: string;
	export const npm_package_type: string;
	export const npm_package_dependencies_dotenv: string;
	export const npm_package_devDependencies__sveltejs_adapter_vercel: string;
	export const npm_config_save_prefix: string;
	export const npm_config_strict_ssl: string;
	export const npm_config_version_git_message: string;
	export const CONDA_PYTHON_EXE: string;
	export const LOGNAME: string;
	export const YARN_WRAP_OUTPUT: string;
	export const npm_lifecycle_script: string;
	export const npm_package_devDependencies_svelte_loading_spinners: string;
	export const CONDA_DEFAULT_ENV: string;
	export const MYSQL_HOME: string;
	export const npm_config_version_git_sign: string;
	export const npm_config_ignore_scripts: string;
	export const npm_config_user_agent: string;
	export const npm_config_init_version: string;
	export const npm_config_ignore_optional: string;
	export const SECURITYSESSIONID: string;
	export const npm_package_dependencies_svelte_web3: string;
	export const npm_package_scripts_check: string;
	export const npm_node_execpath: string;
	export const npm_config_version_tag_prefix: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		GITHUB_ID: string;
		GITHUB_SECRET: string;
		AUTH_SECRET: string;
		AUTH0_CLIENT_ID: string;
		AUTH0_CLIENT_SECRET: string;
		AUTH0_DOMAIN: string;
		AUTH0_BASE_URL: string;
		AUTH0_ISSUER_BASE_URL: string;
		TWITTER_KEY: string;
		TWITTER_ID: string;
		TWITTER_SECRET: string;
		GOOGLE_ID: string;
		GOOGLE_SECRET: string;
		GPT3_API_KEY: string;
		POSTGRES_URL: string;
		POSTGRES_PRISMA_URL: string;
		POSTGRES_URL_NON_POOLING: string;
		DATABASE_URL: string;
		npm_package_devDependencies_prisma: string;
		TERM_PROGRAM: string;
		NODE: string;
		npm_package_dependencies__auth_sveltekit: string;
		INIT_CWD: string;
		npm_package_devDependencies_typescript: string;
		npm_package_homepage: string;
		npm_config_version_git_tag: string;
		SHELL: string;
		TERM: string;
		npm_package_devDependencies_vite: string;
		TMPDIR: string;
		CONDA_SHLVL: string;
		npm_config_init_license: string;
		CONDA_PROMPT_MODIFIER: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		TERM_SESSION_ID: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_private: string;
		npm_config_registry: string;
		npm_package_repository_url: string;
		npm_package_readmeFilename: string;
		USER: string;
		npm_package_description: string;
		npm_package_license: string;
		npm_package_scripts_check_watch: string;
		OPENAI_API_KEY: string;
		CONDA_EXE: string;
		HOMEBREW_NO_ANALYTICS: string;
		SSH_AUTH_SOCK: string;
		npm_package_dependencies__prisma_client: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_execpath: string;
		npm_package_dependencies__auth_core: string;
		npm_package_devDependencies_svelte: string;
		MAVEN_OPTS: string;
		_CE_CONDA: string;
		PATH: string;
		npm_config_argv: string;
		npm_package_scripts_postinstall: string;
		LaunchInstanceID: string;
		_: string;
		npm_package_dependencies__sveltejs_adapter_node: string;
		CONDA_PREFIX: string;
		__CFBundleIdentifier: string;
		HOMEBREW_HOME: string;
		PWD: string;
		JAVA_HOME: string;
		npm_package_scripts_preview: string;
		npm_package_bugs_url: string;
		npm_lifecycle_event: string;
		npm_package_dependencies__fontsource_fira_mono: string;
		LANG: string;
		npm_package_name: string;
		npm_package_repository_type: string;
		npm_package_scripts_build: string;
		npm_config_version_commit_hooks: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_svelte_typeahead: string;
		npm_config_bin_links: string;
		npm_package_dependencies_ag_grid_community: string;
		_CE_M: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_svelte_check: string;
		SHLVL: string;
		HOME: string;
		npm_package_type: string;
		npm_package_dependencies_dotenv: string;
		npm_package_devDependencies__sveltejs_adapter_vercel: string;
		npm_config_save_prefix: string;
		npm_config_strict_ssl: string;
		npm_config_version_git_message: string;
		CONDA_PYTHON_EXE: string;
		LOGNAME: string;
		YARN_WRAP_OUTPUT: string;
		npm_lifecycle_script: string;
		npm_package_devDependencies_svelte_loading_spinners: string;
		CONDA_DEFAULT_ENV: string;
		MYSQL_HOME: string;
		npm_config_version_git_sign: string;
		npm_config_ignore_scripts: string;
		npm_config_user_agent: string;
		npm_config_init_version: string;
		npm_config_ignore_optional: string;
		SECURITYSESSIONID: string;
		npm_package_dependencies_svelte_web3: string;
		npm_package_scripts_check: string;
		npm_node_execpath: string;
		npm_config_version_tag_prefix: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
