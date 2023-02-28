<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';
	import { Chasing } from 'svelte-loading-spinners';

	var isLoading = true;
	const submitTrainingProgram = (e) => {
		/* populate hidden form value and submit form programmatically */
		isLoading = true;
		document.forms["trainingprogram"].submit();
	}

	onMount(() => {
		isLoading = false;
	});

    onDestroy(() => {
    });

</script>

{#if isLoading}
<!-- align in the middle of the screen and on top-->
<div style="display: flex; justify-content: center; padding: 10px;">
	<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
</div>
{/if}

<form action="?/createprogram" method = "POST">
<textarea
name="trainingprogram"
value='Create a training program by writing out on what day to train what 
For example:

Day 1: Squats

Day 2: Bench Press

Day 3: 30-45 mins cardio, light Olympic lifts

Day 4: OFF

Day 5: Deadlifts
Day 6: Shoulders, Arms
Day 7: 30-45 mins cardio, calisthenics
Day 8: OFF'

on:focus={(evt) => evt.target.select()}
/>
<button on:click={submitTrainingProgram}>Submit</button>
</form>

<style>

textarea {
        height: 300px;
		width: 100%;
		display: flex;
		align-items: left;
		justify-content: left;
		text-align: left;
		box-sizing: border-box;
		border: none;
		font-size: 16px;
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

button  {
	width: 75px;
    height: 75px;
    padding: 5px;
    background: #d95753;
    border: 0;
	margin: 9px;
}

.btn-size {
    width: 30px;
    height: 30px;
}

.img-size img {
    width: 75px;
    height: 75px;
}
</style>