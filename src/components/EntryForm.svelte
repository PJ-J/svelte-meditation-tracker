<script>
  let entry = '';
  import {addEntry} from "../stores/entryStore";
  import { user } from "../stores/authStore";

  const handleSubmit = () => {
    addEntry(entry, $user.id);
    entry = '';    
  }
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col text-sm mb-2">
		<label class="font-bold mb-2" for="entry">How many minutes did you meditate?</label>
		<input type="number" bind:value={entry} name="minutes" placeholder="minutes" class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"/>
	</div>
  <button type="submit" class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Submit</button>
</form>
