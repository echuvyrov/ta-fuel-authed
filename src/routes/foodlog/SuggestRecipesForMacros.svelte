<script>
	import { Chasing } from 'svelte-loading-spinners';
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	
	var isCreating = false;
	// make value a multiline string constant
	let labelHeader = `Suggest foods or generate a recipe that will help you reach your macros. 
			Edit the text below as you see fit (or leave it unchanged if everything looks good), 
			then click "Generate" to get a list of suggested foods and recipes. Click "Save" to 
			save a given food to the Food Log.`;

	function generate() {
		isCreating = true;
		document.forms["trainingprogram"].submit();
	}

	function save() {
		isCreating = true;
		document.forms["trainingprogram"].submit();
		dispatch("save", value);
	}
	
	function cancel() {
		dispatch("cancel");
	}

  </script>
  
  <div class="modal">
	<div class="content">
		<h2>
			Suggest Food or Recipes for Macros
		</h2>

		{#if isCreating}
		<!-- align in the middle of the screen and on top-->
		<div style="display: flex; justify-content: center; padding: 10px;">
			<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
		{/if}
		
		<form action="?/createprogram" method = "POST">
			<textarea name="generaterecipe" rows="10" cols="50" bind:value></textarea>
			<div class="buttons">
				<button on:click={generate}>Generate Recipe</button>
				<button on:click={save}>Save to Food Log</button>
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
  