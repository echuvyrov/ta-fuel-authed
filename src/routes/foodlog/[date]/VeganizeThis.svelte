<script>
	import { Chasing } from 'svelte-loading-spinners';
	import { createEventDispatcher } from "svelte";
  	import Page from '../../+page.svelte';
	export let foodLog;
	const dispatch = createEventDispatcher();
	let generatedFood = "";

	var isCreating = false;
	// make value a multiline string constant
	let labelHeader = `Here's how you can veganize your daily foods, click Re-veganize button to get more ideas`;

	// from foodLog, extract the food name, food description, food recipe, total_fat_grams, total_carbs_grams, total_protein_grams
	//  separate those with newlines, and add them to promptHeader
	let completePrompt = foodLog.map((food) => {
		return food.food_name + ", Fat: " + food.fat_grams + " grams, Carbs: " + food.carbs_grams + " grams, Protein: " + food.protein_grams + " grams.";
	}).join("\n");

	let value = "Veganizing these foods: \n\n" + completePrompt;

	function save() {
		isCreating = true;
		document.forms["veganizer"].submit();
		dispatch("save", generatedFood);
	}
	
	function reveganize() {
		isCreating = true;
		document.forms["veganizer"].submit();
	}
	
	function cancel() {
		dispatch("cancel");
	}

	/* sveltekit fetch method to update the record */
	async function veganizeFood(event) {
		event.preventDefault();
		await veganize();
	}

	async function veganize() {
		isCreating = true;
		const foodRequestData = { veganize_this_food: completePrompt};
		const jsonData = JSON.stringify(foodRequestData);
		const res = await fetch('/foodlog/[date]/veganizefood', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: jsonData
		});
		const json = await res.json();
		if (!res.ok) {
			console.log(json);
		}

		generatedFood = json.generated_food;
		isCreating = false;
	}

	function formatGeneratedText(){
		/*
		var retVal = "";
		var foodJSON = JSON.parse(generatedFood);
		retVal = foodJSON.food_name + "\n" + foodJSON.food_description + "\n\n" + foodJSON.food_recipe + "\n";
		retVal += "\n\n" + "Fat: " + foodJSON.total_fat_grams + " grams, Carbs: " + foodJSON.total_carbs_grams + " grams, Protein: " + foodJSON.total_protein_grams + " grams.";

		return retVal;
		*/

		return generatedFood;
	}

	function getGeneratedFoodJSON() {
		return JSON.parse(generatedFood);
	}

	// invoke the veganizeFood method on page load
	veganize();
  </script>
  
  <div class="modal">
	<div class="content">
		<h2>
			{labelHeader}
		</h2>

		{#if isCreating}
		<!-- align in the middle of the screen and on top-->
		<div style="display: flex; justify-content: center; padding: 10px;">
			<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
		{/if}
		
		<form name="veganizer" action="?/addsuggestedfood" method = "POST">
			<textarea name="veganizethis" rows="10" cols="50" bind:value></textarea>
			<!-- make the following textarea visible only if value in generatedFood is non-empty -->
			{#if generatedFood !== ''}
				<textarea name="receiverecipe" rows="10" cols="50">{formatGeneratedText(generatedFood)}
				</textarea>
			{/if}
			<div class="buttons">
				{#if generatedFood !== ''}
				<!-- 
					<input type="hidden" name="food" value={getGeneratedFoodJSON().food_name} />
					<input type="hidden" name="food_qty" value="1" />
					<input type="hidden" name="fat_grams" value={getGeneratedFoodJSON().total_fat_grams} />
					<input type="hidden" name="carbs_grams" value={getGeneratedFoodJSON().total_carbs_grams} />
					<input type="hidden" name="protein_grams" value={getGeneratedFoodJSON().total_protein_grams} />
					<input type="hidden" name="total_kkcals" value={getGeneratedFoodJSON().total_kkcals} />
				-->
					<button on:click={veganizeFood}>Add to today's food log</button>
					<button on:click={veganizeFood}>Re-veganize</button>
				{/if}
				<button on:click={cancel}>Cancel</button>
			</div>
		</form>
	</div>
  </div>
  
  <style>
	.modal {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, 0.5);
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.content {
	  background-color: white;
	  padding: 20px;
	  border-radius: 4px;
	}
	
	/* make textarea pretty with about 13 point font */
	textarea {
		font-family: "Lucida Console", Monaco, monospace;
		font-size: 13px;
		line-height: 1.5;
		width: 100%;
		box-sizing: border-box;
	}

	.buttons {
	  display: flex;
	  justify-content: flex-end;
	  margin-top: 10px;
	}
	
	button {
	  margin-left: 10px;
	}
  </style>
  