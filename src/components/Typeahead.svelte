<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	export let placeholder = '';
	export let suggestions: string[] = [];
	export let minInputLength: number = 1;

	let inputValue: string = '';
	let filteredSuggestions: string[] = [];
	let selectedIndex: number = -1;
	let isSuggestionsVisible: boolean = false;

	const dispatch = createEventDispatcher();

	function onInput(event: any) {
		inputValue = (event.target as HTMLInputElement).value;
		if (inputValue.length >= minInputLength) {
			filteredSuggestions = suggestions.filter((suggestion) =>
				suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
			);
			isSuggestionsVisible = filteredSuggestions.length > 0;
		} else {
			isSuggestionsVisible = false;
		}
		selectedIndex = -1;
	}

	function onSelectSuggestion(index: number) {
		inputValue = filteredSuggestions[index];
		isSuggestionsVisible = false;
		dispatch('select', inputValue);
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (selectedIndex < filteredSuggestions.length - 1) {
				selectedIndex++;
			}
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (selectedIndex > 0) {
				selectedIndex--;
			}
		} else if (event.key === 'Enter') {
			event.preventDefault();
			if (selectedIndex !== -1) {
				onSelectSuggestion(selectedIndex);
			}
		}
	}
</script>

<div class="relative">
	<input
		type="text"
		class="w-full py-2 px-3 border border-gray-300 rounded"
		{placeholder}
		bind:value={inputValue}
		on:input={onInput}
		on:keydown={onKeyDown}
	/>
	{#if isSuggestionsVisible}
		<ul class="absolute w-full bg-white border border-gray-300 rounded mt-1 shadow-md z-10">
			{#each filteredSuggestions as suggestion, index}
				<li
					class="px-3 py-2 cursor-pointer hover:bg-gray-200 {selectedIndex === index
						? 'bg-gray-200'
						: ''}"
					on:click={() => onSelectSuggestion(index)}
				>
					{suggestion}
				</li>
			{/each}
		</ul>
	{/if}
</div>
