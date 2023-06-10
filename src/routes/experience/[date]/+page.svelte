<script>
    export let data;	
	import { onDestroy, onMount } from 'svelte';

	/* sveltekit fetch method to update the record */
	async function updateRecord(data) {
		const jsonData = JSON.stringify(data);
		const res = await fetch('/foodlog/updaterecord', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonData
		});
		const json = await res.json();
		if (!res.ok) {
			throw Error(json.message);
		}
		return json;
	}

</script>
<center>
	<div class="experienceheader">What you ate today</div>
</center>


<!-- create a 5-column flex box and add foodReference items to each column -->
<div class="grid">
	<!-- iterate over all items in data.foodReferences -->
	{#each data.todaysFoods as todaysFood, i}
		{#if todaysFood.foodReference != null }
			<form action="?/addfood" method = "POST">
				<div class="grid-item">
					<!-- removing the image64 from embedding to save up bandwidth -->
					<input type="hidden" value={JSON.stringify((({ imageBase64, ...rest }) => rest)(todaysFood.foodReference))} name="food">
					<!-- image from base64 string -->
					<button title = "{todaysFood.foodReference.food_name}">
						<img src="data:image/png;base64, {todaysFood.foodReference.imageBase64}" title = "{todaysFood.foodReference.food_name}" class="food_image" />
					</button>		
				</div>
			</form>
		{/if}
	{/each}
</div>

<center>
	<div class="experienceheader">What you eat most frequently (simply click to add to today's log)</div>
</center>

<!-- create a 5-column flex box and add foodReference items to each column -->
<div class="grid">
	<!-- iterate over all items in data.foodReferences -->
	{#each data.foodReferences as foodReference, i}
		{#if foodReference.foodReference != null }

			<form action="?/addfood" method = "POST">
				<div class="grid-item">
					<!-- removing the image64 from embedding to save up bandwidth -->
					<input type="hidden" value={JSON.stringify((({ imageBase64, ...rest }) => rest)(foodReference.foodReference))} name="food">
					<!-- image from base64 string -->
					<button title = "{foodReference.foodReference.food_name} (used {foodReference.count} times)">
						<img src="data:image/png;base64, {foodReference.foodReference.imageBase64}" alt = "{foodReference.foodReference.food_name} (used {foodReference.count} times)" class="food_image"/>
					</button>		
				</div>
			</form>
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