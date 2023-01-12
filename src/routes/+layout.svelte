<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<a href="https://kit.svelte.dev">visit tactical athletics for more stuff like this</a>
	</footer>
</div>
