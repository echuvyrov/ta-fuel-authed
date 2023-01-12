<script>
	import { page } from '$app/stores';
	import { user, isAuthenticated } from '$lib/stores/stores.js';
	import logo from '$lib/images/ta-logo.png';
	const today = new Date();
	const todayString = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + ("0" + today.getDate()).slice(-2);
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={logo} alt="Tactical Athletics" />
		</a>
	</div>

	<div class = "header">

		<div class="signedInStatus">
			<p class="nojs-show loaded">
				{#if $page.data.session}
					{#if $page.data.session.user?.username}
						{user.username = $page.data.session.user?.username}
					{/if}

					{user.name = $page.data.session.user?.name}
					{#if $page.data.session.user?.image}
						<span
						style="background-image: url('{$page.data.session.user.image}')"
						class="avatar"
						/>
					{/if}
					<span class="signedInText">
						<small>Signed in as</small><br />
						<strong
						>{$page.data.session.user?.name}</strong
						>
					</span>
					<a href="/auth/signout" class="buttonPrimary">Sign out</a>
			
				{:else}
					<a href="/auth/signin" class="buttonPrimary">Sign in</a>
				{/if}
			</p>
		</div>
		{#if $page.data.session}
		{#if $page.data.session.user?.name}

			<nav>
				<svg viewBox="0 0 2 3" aria-hidden="true">
					<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
				</svg>
				<ul>
					<li class:active={$page.url.pathname === '/foodlog'}>
						<a href="/foodlog/{todayString}">Log</a>
					</li>
					<li class:active={$page.url.pathname === '/reference'}>
						<a href="/reference">Reference</a>
					</li>
					<li class:active={$page.url.pathname === ('/experience')}>
						<a href="/experience">Experience</a>
					</li>
				</ul>
				<svg viewBox="0 0 2 3" aria-hidden="true">
					<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
				</svg>

				<div class="corner">
				</div>
			</nav>
		{/if}
	{/if}
</header>

<style>

header {
	display: flex;
	justify-content: center;
}

.corner {
	width: 3em;
	height: 3em;
}

.corner a {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.corner img {
	width: 2em;
	height: 2em;
	object-fit: contain;
}

nav {
	display: flex;
	justify-content: center;
	--background: rgba(255, 255, 255, 0.7);
}

svg {
	width: 2em;
	height: 3em;
	display: block;
}

path {
	fill: var(--background);
}

ul {
	position: relative;
	padding: 0;
	margin: 0;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;
	background: var(--background);
	background-size: contain;
}

li {
	position: relative;
	height: 100%;
}

li.active::before {
	--size: 6px;
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	top: 0;
	left: calc(50% - var(--size));
	border: var(--size) solid transparent;
	border-top: var(--size) solid var(--color-theme-1);
}

nav a {
	display: flex;
	height: 100%;
	align-items: center;
	padding: 0 0.5rem;
	color: var(--color-text);
	font-weight: 700;
	font-size: 0.8rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	text-decoration: none;
	transition: color 0.2s linear;
}

a:hover {
	color: var(--color-theme-1);
}

</style>