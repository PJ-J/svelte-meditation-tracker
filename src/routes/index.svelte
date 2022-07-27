<script>
	import EntryForm from '../components/EntryForm.svelte';
	import Entry from '../components/Entry.svelte';
	import index from '../components/Entry.svelte';
	import { entries } from '../stores/entrystore';
	import format from 'date-fns/format';
	import compareDesc from 'date-fns/compareDesc';
	import { slide } from 'svelte/transition';
	export let open = false;
	export let nameOfHeader = "Entry List"
	export let onClick = () => {
		open = !open;
	};

	// get minutes from each DB entry into own array
	$: minutesArray = $entries.map((entry) => entry.minutes);

	// sum function to pass into reduce
	const totalMinutes = (total, minutes) => {
		return total + minutes;
	};

	// reduce minutes array to total minutes
	$: totalMins = minutesArray.reduce(totalMinutes, 0);
	// convert to hours w 2 decimal places
	$: totalHours = (totalMins / 60).toFixed(2) + ' hours';

	// getting all dates in their own clean array
	$: dateArray = $entries.map((entry) => entry.created_at.slice(0, 10).replace(/-/g, ', '));

	//function for comparing dates in the dateArray to see if they're desc or ascending
	const compareFunction = (array) => {
		let result = [];
		for (let index = 0; index < array.length; index++) {
			result.push(compareDesc(new Date(array[index]), new Date(array[index + 1])));
		}
		return result;
	};

	$: compare = compareFunction(dateArray);

	//now going to use the compare array, and if date is ascending(meaning value = 1), then add that to streak
	$: streak = compare.filter((value) => value == 1).length + 1;

	// $: compareArray = returnDate.filter((date))

	$: totalSessions = $entries.length;

	$: hour = $entries.filter((entry) => entry.minutes >= 60).length;
</script>

<style>
	:root {
		--transition-duration: 500ms;
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	header {
		display: flex;
		padding: .2rem;
		border-radius: .2rem;
	}

	svg {
		margin: auto;
		height: 1rem;
		stroke: black;
		transition: transform var(--transition-duration);
	}

	.true {
		transform: rotate(180deg);
	}
</style>


<main class="md:container md:mx-auto">
	<h1 class="text-2xl font-bold text-center md:text-3xl">Meditation Tracker</h1>

	<!-- <p>{returnDay}</p> -->
	<!-- <p>{dateArray}</p> -->

	<EntryForm />
	<p>{compare}</p>
	<p>You are currently on a {streak}-day streak!</p>
	<!-- <p>{minutesArray}</p> -->
	<p>You've meditated a total of {totalHours}!</p>

	<p>{totalSessions} entries</p>
	<p>{hour} long sessions</p>
	<section>
		<button on:click={onClick}>
			<header {onClick} class="bg-tile bg-cover text-black">
				<svg
					
					class={open}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3"
				>
					<path d="M19 9l-7 7-7-7" />
				</svg>
				 {nameOfHeader}
			</header>
		</button>
		{#if open}
			<div transition:slide={{ duration: 500 }}>
				{#each $entries as entry}
					<Entry {entry} index={entry.id} />
				{/each}
			</div>
		{/if}
	</section>
</main>
