<script>
  import TodoForm from "../components/TodoForm.svelte"
  import Todo from "../components/Todo.svelte"
  import {todos} from "../stores/todoStore"

  $: total = $todos.length;
  $: hour = $todos.filter(todo => todo.minutes >= 60).length;
</script>

<main>
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Meditation Tracker</h1>
  <p>{total} entries</p>
  <p>{hour} long sessions</p>
  <TodoForm/>
  {#each $todos as todo}
    <Todo todo={todo} index={todo.id}/>
  {/each}
</main>