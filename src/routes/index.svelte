<script>
	import EntryForm from '../components/EntryForm.svelte';
	import Entry from '../components/Entry.svelte';
	import { entries } from '../stores/entrystore';
	import formatDistance from 'date-fns/formatDistance';
	import { slide } from 'svelte/transition';
	export let open = false;
	export let nameOfHeader = 'Entry List';
	import { fade, blur, fly } from "svelte/transition";
	let isActive = true;
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

	//function for looking through date array from r to l to see interval between dates
	const checkInterval = (array) => {
		let intervals = [];
		for (let i = array.length - 1; i > 0; i--) {
			intervals.push(formatDistance(new Date(array[i]), new Date(array[i - 1])));
		}
		return intervals;
	};

	$: dateIntervals = checkInterval(dateArray);

	//function for comparing date intervals
	const checkStreak = (array) => {
		let count = 1;
		for (let i = 0; i < array.length; i++) {
			if (array[i] == '1 day') {
				count++;
			} else {
				return count;
			}
		}
		return count;
	};

	// pass dateIntervals to checkStreak function
	$: streak = checkStreak(dateIntervals);
	$: totalSessions = $entries.length;

	$: hour = $entries.filter((entry) => entry.minutes >= 60).length;
</script>

<main class="md:container md:mx-auto">
	<div class="flex space-x-40 h-28">
	{#if isActive}
		<div class="box" transition:fly={{ x:-100}} />
	{/if}
	<button on:click={() => (isActive = !isActive)}
		>{#if isActive}Hide Box{:else}Show Box{/if}
	</button>
</div>
	<h1 class="text-2xl font-bold text-center md:text-3xl">Meditation Tracker</h1>

	<!-- <p>{returnDay}</p> -->
	<!-- <p>{dateArray}</p> -->

	<EntryForm />
	<!-- <p>{compare}</p> -->
	<p>You are currently on a {streak}-day streak!</p>

	<!-- <p>{dateIntervals}</p> -->
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

<style>
	:root {
		--transition-duration: 500ms;
	}

	.box {
		height: 100px;
		width: 100px;
		background-color: red;
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	header {
		display: flex;
		padding: 0.2rem;
		border-radius: 0.2rem;
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
