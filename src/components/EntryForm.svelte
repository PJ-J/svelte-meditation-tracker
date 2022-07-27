<script>
  let entry = '';
  import {addEntry} from "../stores/entryStore";
  import { user } from "../stores/authStore";

  const handleSubmit = () => {
    addEntry(entry, $user.id);
    entry = '';    
  };
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col mb-2">
		<label class="text-lg mb-2" for="entry">How many minutes did you meditate?</label>
		<input type="number" bind:value={entry} name="minutes" placeholder="minutes" class="text-black appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"/>
	</div>
  <button type="submit" class="w-full shadow-sm rounded bg-marble hover:bg-gradient-to-r from-cyan-500 to-blue-500 text-black py-2 px-4">Submit</button>
</form>
