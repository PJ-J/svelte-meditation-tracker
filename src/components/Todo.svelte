<script>
  export let todo;
import Index from '../routes/index.svelte';
  import {deleteTodo, toggleTodoCompleted} from '../stores/todoStore.js';
import TodoForm from './TodoForm.svelte';
import format from 'date-fns/format';

  
</script>


<li class="bg-white flex items-center shadow-sm border border-gray-200 rounded-lg my-2 py-2 px-4">
  <input
      name="completed"
      type="checkbox"
      checked={todo.completed}
      on:change={() => toggleTodoCompleted(todo.id, todo.completed)}
      class="mr-2 form-checkbox h-5 w-5"
  />
  <span
      class={`flex-1 text-gray-800  ${
          todo.completed ? 'line-through' : ''
      }`}
  >
      {(todo.minutes / 60).toFixed(2)} hour(s), {format((new Date(todo.created_at.slice(0,10).replace(/-/g, ", "))), 'MM/dd/yyyy')}
  </span>
  <button
      type="button"
      class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      on:click={() => deleteTodo(todo.id)}
  >
      Delete
  </button>
</li>