<script>
  let todo = '';
  import {addTodo} from "../stores/todoStore";
  import { user } from "../stores/authStore";

  const handleSubmit = () => {
    addTodo(todo, $user.id);
    todo = '';    
  }
</script>

<form class="my-6" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col text-sm mb-2">
		<label class="font-bold mb-2" for="todo">How many minutes did you meditate?</label>
		<input type="text" bind:value={todo} name="todo" placeholder="minutes" class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"/>
	</div>
  <button type="submit" class="w-full shadow-sm rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">Submit</button>
</form>
