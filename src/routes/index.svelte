<script>
	import TodoForm from '../components/TodoForm.svelte';
	import Todo from '../components/Todo.svelte';
	import { todos } from '../stores/todoStore';
	import format from 'date-fns/format';
	import compareDesc from 'date-fns/compareDesc';

	$: returnDay = $todos.map((todo) => todo.created_at.slice(8, 10));
  
  // getting all dates in their own clean array
	$: dateArray = $todos.map((todo) =>
		todo.created_at.slice(0, 10).replace(/-/g, ', ')
	);

	$: compare = compareFunction(dateArray);

  //function for comparing dates in the dateArray to see if they're desc or ascending
  function compareFunction(array) {
    let arr = [];
    for (let index = 0; index < array.length; index++) {
    arr.push(compareDesc(new Date(array[index]), new Date(array[index + 1])));
    }
    return arr;
  }

  //now going to use the compare array, and if date is ascending(meaning value = 1), then add that to streak
  $: streak = compare.filter(value => value == 1).length + 1;

	// $: compareArray = returnDate.filter((date))

	$: totalSessions = $todos.length;

	$: hour = $todos.filter((todo) => todo.minutes >= 60).length;
</script>

<main>
	<h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">Meditation Tracker</h1>

	<!-- <p>{returnDay}</p> -->
	<!-- <p>{dateArray}</p> -->
	<p>{compare}</p>
	<p>You are currently on a {streak}-day streak!</p>

	<p>{totalSessions} entries</p>
	<p>{hour} long sessions</p>
	<TodoForm />
	{#each $todos as todo}
		<Todo {todo} index={todo.id} />
	{/each}
</main>
