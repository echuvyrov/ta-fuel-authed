<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';

	const today = data.today;
	const todayString = new Date(today).toISOString().split('T')[0];;

	// get tomorrow from today + 1 day without time zone

	// tomorrow is today + 1 day
	var tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowString = tomorrow.toISOString().split('T')[0];

	// yesterday is today - 1 day
	var yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayString = yesterday.toISOString().split('T')[0];
</script>

<div class="container">
	<h3><a data-sveltekit-reload href="/@{data.nickname}/">@{data.nickname} Food Porn</a> 
		| <a data-sveltekit-reload href="/@{data.nickname}/traininglog">Training</a> 
		| <a data-sveltekit-reload href="/@{data.nickname}/foodlog">Food Log</a>
	</h3>
</div>

<!-- svg icon of rectangle pointing to the left -->
<div class="container">
	<div class="left-image">
		<a data-sveltekit-reload href="/@{data.nickname}/{yesterdayString}"><i class="fa fa-arrow-circle-left" style="font-size:36px; color:blue; padding:10px"></i></a>
	</div>
	<div class="foodheader">
		What {data.nickname} ate on {todayString}
	</div>
	<div class="right-image">
		<a data-sveltekit-reload href="@{data.nickname}/{tomorrowString}"><i class="fa fa-arrow-circle-right" style="font-size:36px; color:blue; padding:10px"></i></a>
	</div>
</div>


<!-- create a 5-column flex box and add foodReference items to each column -->
<div class="grid">
	<!-- iterate over all items in data.foodReferences -->
	{#each data.todaysFoods as todaysFood, i}
		{#if todaysFood.foodReference != null }
			<div class="grid-item">
				<!-- removing the image64 from embedding to save up bandwidth -->
				<input type="hidden" value={JSON.stringify((({ imageBase64, ...rest }) => rest)(todaysFood.foodReference))} name="food">
				<!-- image from base64 string -->
				<button title = "{todaysFood.foodReference.food_name}">
					<img src="data:image/png;base64, {todaysFood.foodReference.imageBase64}" title = "{todaysFood.foodReference.food_name}" class="food_image" />
				</button>		
			</div>
		{/if}
	{/each}
</div>

<center>
	<div class="experienceheader">What {data.nickname} eats most frequently</div>
</center>

<!-- create a 5-column flex box and add foodReference items to each column -->
<div class="grid">
	<!-- iterate over all items in data.foodReferences -->
	{#each data.foodReferences as foodReference, i}
		{#if foodReference.foodReference != null }
			<div class="grid-item">
				<!-- removing the image64 from embedding to save up bandwidth -->
				<input type="hidden" value={JSON.stringify((({ imageBase64, ...rest }) => rest)(foodReference.foodReference))} name="food">
				<!-- image from base64 string -->
				<button title = "{foodReference.foodReference.food_name} (used {foodReference.count} times)">
					<img src="data:image/png;base64, {foodReference.foodReference.imageBase64}" alt = "{foodReference.foodReference.food_name} (used {foodReference.count} times)" class="food_image"/>
				</button>		
			</div>
		{/if}
	{/each}
</div>

<!--

<div>
	<div style="display: flex; flex-direction: row; place-content: stretch center; box-sizing: border-box; width: 100%; gap: 16px;">
		

	</div>
</div>
-->

<style>

input {
        height: 220px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}

button  {
	width: 266px;
    height: 266px;
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

/* Grid */
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-gap: 0.8rem;
}

h3 {
	color:#d95753;
}

 /* Media query for mobile */
 @media screen and (max-width: 768px) {
	button  {
		width: 160px;
    	height: 160px;
    	padding: 5px;
    	background: #d95753;
    	border: 0;
	}
	
	.food_image {
		width: 150px;
		height: 150px;
	}

	/* Grid */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(170px, .1fr));
		grid-gap: 0.4rem;
	}

}
  
</style>