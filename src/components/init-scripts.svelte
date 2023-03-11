<script lang="ts">
	import StackIcon from './stack-icon.svelte';

	export let initScript = '';

	let initScripts = [
		'npm create vite@latest',
		'npx ng new',
		'npm init video',
		'pnpm create next-app --typescript',
		''
	];

	$: {
		if (initScripts.at(-1)?.length) {
			addInitScript();
			initScript = initScripts[initScripts.length - 2];
		} else if (!initScripts.at(-1)?.length && !initScripts.at(-2)?.length) {
			removeLastInitScript();
			initScript = initScripts[initScripts.length - 2];
		}
	}

	function handleFocus(e: any) {
		setTimeout(() => {
			e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
		});
	}

	function handleKeyup(e: any) {
		initScript = e?.target.value;
	}

	function addInitScript() {
		initScripts = [...initScripts, ''];
	}

	function removeLastInitScript() {
		initScripts = [...initScripts.slice(0, initScripts.length - 1)];
	}
</script>

{#each initScripts as option, i}
	<div
		class="flex gap-2 mb-1 items-center rounded-lg overflow-hidden relative transition-all 
			{option === initScript ? 'bg-slate-400/10' : ''}"
	>
		<input
			type="radio"
			name="script"
			id="g{i}"
			value={option}
			bind:group={initScript}
			class="cursor-pointer"
			hidden
		/>
		<StackIcon
			value={option}
			class="absolute left-2 w-6 {option === initScript ? 'opacity-100' : 'opacity-50'}"
		/>
		<input
			type="text"
			bind:value={option}
			on:click={() => (initScript = option)}
			on:focus={handleFocus}
			on:keyup={handleKeyup}
			placeholder="enter a new script"
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
