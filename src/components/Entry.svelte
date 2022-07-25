<script>
export let entry;
import Index from '../routes/index.svelte';
import {deleteEntry, toggleEntryCompleted} from '../stores/entrystore.js';
import entryForm from './entryForm.svelte';
import format from 'date-fns/format';


const minsOrHours = (minutes) => {
    if (minutes < 60) {
        return (entry.minutes + " minutes");
    } else {
        return ((entry.minutes / 60).toFixed(2) + " hour")
    }
}





  
</script>


<li class="bg-white flex items-center shadow-sm border border-gray-200 rounded-lg my-2 py-2 px-4">
  <input
      name="completed"
      type="checkbox"
      checked={entry.completed}
      on:change={() => toggleEntryCompleted(entry.id, entry.completed)}
      class="mr-2 form-checkbox h-5 w-5"
  />
  <span
      class={`flex-1 text-gray-800  ${
          entry.completed ? 'line-through' : ''
      }`}
  >
    {minsOrHours(entry.minutes)}, {format((new Date(entry.created_at.slice(0,10).replace(/-/g, ", "))), 'MM/dd/yyyy')}
  </span>
  <button
      type="button"
      class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      on:click={() => deleteEntry(entry.id)}
  >
      Delete
  </button>
</li>