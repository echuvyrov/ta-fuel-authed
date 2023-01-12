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
		{#if $page.data.session}
			{#if $page.data.session.user?.name}

				<nav>
					<svg viewBox="0 0 2 3" aria-hidden="true">
						<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
					</svg>
					<ul>
						<li class:active={$page.url.pathname === '/foodlog'}>
							<a href="/foodlog/{todayString}">Log •</a>
						</li>
						<li class:active={$page.url.pathname === '/reference'}>
							<a href="/reference">Reference •</a>
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
	</div>
</header>
