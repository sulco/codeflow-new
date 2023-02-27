<script lang="ts">
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';
	let steps = [
		{ label: 'scaffolding', ready: false },
		{ label: 'setting up git', ready: false },
		{ label: 'launching editor', ready: false }
	];

	onMount(() => {
		setTimeout(() => {
			steps[0].ready = true;
		}, 2000);
		setTimeout(() => {
			steps[1].ready = true;
		}, 5000);
		setTimeout(() => {
			steps[2].ready = true;
			goto('https://stackblitz.com/~');
		}, 5500);
	});
</script>

<div class="mt-12 border rounded bg-gray-800 border-gray-700 p-4 shadow-md max-w-sm m-auto">
	<ul class="font-mono">
		{#each steps.slice(0, 2) as step, i}
			<li>
				{step.label}…
				{#if steps[i].ready}
					<span class="text-green-400">done</span>
				{/if}
			</li>
		{/each}
		{#if steps[steps.length - 1].ready}
			<li class="mt-3">
				{steps[steps.length - 1].label}
			</li>
		{/if}
	</ul>
</div>
