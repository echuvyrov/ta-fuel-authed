<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {

	});

    onDestroy(() => {
    });

</script>

<form action="?/createprogram" method = "POST">
<textarea
name="trainingprogram"
value='Create a training program by writing out on what day to train what 
For example:

Monday: Chest, Back, Shoulders 
Tuesday: Legs, Abs 
Wednesday: Rest
Thursday: Chest, Back, Shoulders
Friday: Legs, Abs 
Saturday: Rest
Sunday: Rest'
on:focus={(evt) => evt.target.select()}
/>
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