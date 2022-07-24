<script>
	import TodoForm from '../components/TodoForm.svelte';
	import Todo from '../components/Todo.svelte';
	import { todos } from '../stores/todoStore';
	import format from 'date-fns/format';
	import compareDesc from 'date-fns/compareDesc';

	// get minutes from each DB entry into own array
	$: minutesArray = $todos.map(entry => entry.minutes);

	// sum function to pass into reduce
	const totalMinutes = (total, minutes) => {
		return total + minutes;
	}

	// reduce minutes array to total minutes
	$: totalMins = minutesArray.reduce(totalMinutes, 0);
	// convert to hours w 2 decimal places
	$: totalHours = ((totalMins / 60).toFixed(2) + " hours")
  
  // getting all dates in their own clean array
	$: dateArray = $todos.map((todo) =>
		todo.created_at.slice(0, 10).replace(/-/g, ', ')
	);
  
  //function for comparing dates in the dateArray to see if they're desc or ascending
  const compareFunction = (array) => {
    let result = [];
    for (let index = 0; index < array.length; index++) {
      result.push(compareDesc(new Date(array[index]), new Date(array[index + 1])));
    }
    return result;
  }
  
  $: compare = compareFunction(dateArray);

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
	<!-- <p>{minutesArray}</p> -->
	<p>You've meditated a total of {totalHours}!</p>

	<p>{totalSessions} entries</p>
	<p>{hour} long sessions</p>
	<TodoForm />
	{#each $todos as todo}
		<Todo {todo} index={todo.id} />
	{/each}
</main>
