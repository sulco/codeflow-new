<script lang="ts">
	import { initScripts } from './init-scripts';
	import StackIcon from './stack-icon.svelte';

	export let value = 3;

	let newScript = '';

	function handleFocus(e: any) {
		setTimeout(() => {
			e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
		});
	}
</script>

{#each initScripts as option, i}
	<div
		class="flex gap-2 mb-1 items-center rounded-lg overflow-hidden relative transition-all 
{value === i ? 'bg-slate-400/10' : ''}"
	>
		<input
			type="radio"
			name="script"
			id="g{i}"
			value={i}
			bind:group={value}
			class="cursor-pointer"
			hidden
		/>
		<StackIcon
			value={option}
			class="absolute left-2 w-6 {value === i ? 'opacity-100' : 'opacity-50'}"
		/>
		<input
			type="text"
			bind:value={option}
			on:click={() => (value = i)}
			on:focus={handleFocus}
			class="rounded bg-transparent hover:bg-gray-900 focus:bg-gray-900 p-3 pl-12 focus:outline font-mono text-xs w-full"
		/>
		<!-- <button
			type="button"
			class="absolute right-2 opacity-0 hover:opacity-80"
			on:click={() => {
				initScripts = [...initScripts.slice(0, i), ...initScripts.slice(i + 1)];
			}}>❌</button
		> -->
	</div>
{/each}
<div class="flex gap-2 mb-1 items-center rounded-lg overflow-hidden relative transition-all">
	<input
		type="radio"
		name="script"
		id="g{initScripts.length}"
		value={initScripts.length}
		bind:group={value}
		class="cursor-pointer"
		hidden
	/>
	<StackIcon value={newScript} class="absolute left-2 w-6" />
	<input
		type="text"
		placeholder="enter a new script"
		bind:value={newScript}
		on:focus={handleFocus}
		class="rounded bg-transparent hover:bg-gray-900 focus:bg-gray-900 p-3 pl-12 focus:outline font-mono text-xs w-full"
	/>
</div>
