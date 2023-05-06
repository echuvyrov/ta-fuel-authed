<script>
	import { Chasing } from 'svelte-loading-spinners';
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	
	var isCreating = false;
	// make value a multiline string constant
	let value = `Create a training program by writing out specific training area for each day.

For example:	  
 Day 1: Squats
 Day 2: Bench Press
 Day 3: 30-45 mins cardio, light Olympic lifts
 Day 4: OFF
 Day 5: Deadlifts
 Day 6: Shoulders, Arms
 Day 7: 30-45 mins cardio, calisthenics
 Day 8: OFF`;
	
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
			Create New Training Program
		</h2>

		{#if isCreating}
		<!-- align in the middle of the screen and on top-->
		<div style="display: flex; justify-content: center; padding: 10px;">
			<Chasing size="60" color="#FF3E00" unit="px" duration="1s" />
		</div>
		{/if}
		
		<form action="?/createprogram" method = "POST">
			<textarea name="trainingprogram" rows="10" cols="50" bind:value></textarea>
			<div class="buttons">
				<button on:click={save}>Save</button>
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
  