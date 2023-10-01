<script>
	import { Chasing } from 'svelte-loading-spinners';
	import { createEventDispatcher } from "svelte";
	export let foodData;
	const dispatch = createEventDispatcher();
	let generatedFood = "";

	var isCreating = false;
	// make value a multiline string constant
	let labelHeader = `Modify the text below (or leave as is) to generate food ideas`;

	let value = `Please suggest a vegetarian recipe to fit the following macros. \n
Fat: ` + totalsData[2].fat_grams +  ` grams, Carbs: ` + totalsData[2].carbs_grams + ` grams, 
Protein: ` + totalsData[2].protein_grams + ` grams. Feel free to mix and match ingredients.`;
	
	function save() {
		isCreating = true;
		document.forms["macrosgenie"].submit();
		dispatch("save", value);
	}
	
	function cancel() {
		dispatch("cancel");
	}

	/* sveltekit fetch method to update the record */
	async function generateFoodSuggestions(event) {
		isCreating = true;
		event.preventDefault();
		const foodRequestData = { food_for_macros: value};
		const jsonData = JSON.stringify(foodRequestData);
		const res = await fetch('/foodlog/[date]/generatefoodsuggestions', {
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
		var retVal = "";
		var foodJSON = JSON.parse(generatedFood);
		retVal = foodJSON.food_name + "\n" + foodJSON.food_description + "\n\n" + foodJSON.food_recipe + "\n";
		retVal += "\n\n" + "Fat: " + foodJSON.total_fat_grams + " grams, Carbs: " + foodJSON.total_carbs_grams + " grams, Protein: " + foodJSON.total_protein_grams + " grams.";

		return retVal;
	}

	function getGeneratedFoodJSON() {
		return JSON.parse(generatedFood);
	}
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
		
		<form name="macrosgenie" action="?/addsuggestedfood" method = "POST">
			<textarea name="askforrecipe" rows="10" cols="50" bind:value></textarea>
			<!-- make the following textarea visible only if value in generatedFood is non-empty -->
			{#if generatedFood !== ''}
				<textarea name="receiverecipe" rows="10" cols="50">{formatGeneratedText(generatedFood)}
				</textarea>
			{/if}
			<div class="buttons">
				{#if generatedFood !== ''}
					<input type="hidden" name="food" value={getGeneratedFoodJSON().food_name} />
					<input type="hidden" name="food_qty" value="1" />
					<input type="hidden" name="fat_grams" value={getGeneratedFoodJSON().total_fat_grams} />
					<input type="hidden" name="carbs_grams" value={getGeneratedFoodJSON().total_carbs_grams} />
					<input type="hidden" name="protein_grams" value={getGeneratedFoodJSON().total_protein_grams} />
					<input type="hidden" name="total_kkcals" value={getGeneratedFoodJSON().total_kkcals} />

					<button on:click={save}>Save to Food Log</button>
				{/if}
				<button on:click={generateFoodSuggestions}>Generate Recipe</button>
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
  