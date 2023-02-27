<script lang="ts">
	import { onMount } from 'svelte';
	import Codeflow from '../components/codeflow.svelte';
	import { kebabCase } from 'lodash-es';
	import { goto } from '$app/navigation';

	let projectName = 'demo';
	let gitOption = 0;
	let initOption = 1;
	let nameInputRef: HTMLInputElement;

	let gitOptions = [
		{ label: 'github.com/sulco/', dynamic: true },
		{ label: 'gitlab.com/sulco/', dynamic: true },
		{ label: 'just run `git init`', dynamic: false },
		{ label: 'no git', dynamic: false }
	];

	let initScripts = [
		'npm create vite@latest',
		'npx ng new',
		'npm init video',
		'pnpm create next-app --typescript'
	];

	onMount(() => {
		nameInputRef.focus();
		nameInputRef.selectionStart = 0;
		nameInputRef.selectionEnd = nameInputRef.value.length;
	});

	function handleFocus(e: any) {
		setTimeout(() => {
			e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
		});
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		goto('setting-up');
	}
</script>

<header class="flex gap-2">
	<Codeflow class="w-12 mix-blend-luminosity opacity-50" />
	<h1 class="my-6 text-xl text-gray-400">start a new project</h1>
</header>

<form class="grid gap-4" on:submit={handleSubmit}>
	<fieldset class="fieldset bg-gray-800">
		<div class="field">
			<label for="name" class="block mb-1">Project name:</label>
			<input
				id="name"
				bind:this={nameInputRef}
				class="bg-gray-900 px-2 focus:outline text-lg"
				type="text"
				bind:value={projectName}
			/>
		</div>
	</fieldset>

	<p class="text-xs mt-4 text-gray-500">
		💡 The settings you have used previously are already selected so you can hit [enter] to create a
		project with the same setup
	</p>
	<fieldset class="fieldset bg-gray-800">
		<div class="grid grid-cols-2">
			<section>
				<h2 class="font-semibold mb-2">Git:</h2>
				{#each gitOptions as option, i}
					<div class="flex gap-2 mb-1">
						<input
							type="radio"
							name="git"
							id="g{i}"
							value={i}
							bind:group={gitOption}
							class="cursor-pointer"
						/>
						<label for="g{i}" class="cursor-pointer"
							>{option.label}{option.dynamic ? kebabCase(projectName) : ''}</label
						>
					</div>
				{/each}
			</section>

			<section>
				<h2 class="font-semibold mb-2">Initialize project with:</h2>
				{#each initScripts as option, i}
					<div class="flex gap-2 mb-1 group">
						<input
							type="radio"
							name="script"
							id="g{i}"
							value={i}
							bind:group={initOption}
							class="cursor-pointer"
						/>
						<input
							type="text"
							bind:value={option}
							on:click={() => (initOption = i)}
							on:focus={handleFocus}
							class="bg-transparent hover:bg-gray-900 focus:bg-gray-900 px-2 py-1 focus:outline font-mono text-xs w-full"
						/>
						<button
							type="button"
							class="opacity-0 hover:opacity-80"
							on:click={() => {
								initScripts = [...initScripts.slice(0, i), ...initScripts.slice(i + 1)];
							}}>❌</button
						>
					</div>
				{/each}
				<div class="flex gap-2 mb-1">
					<input
						type="radio"
						name="script"
						id="g{initScripts.length}"
						value={initScripts.length}
						bind:group={initOption}
						class="cursor-pointer"
					/>
					<input
						type="text"
						placeholder="enter a new script"
						on:focus={handleFocus}
						class="bg-transparent hover:bg-gray-900 focus:bg-gray-900 px-2 py-1 focus:outline rounded font-mono text-xs w-full placeholder:text-gray-500"
					/>
				</div>
			</section>
		</div>
	</fieldset>

	<button
		disabled={!projectName.length}
		class="justify-self-end bg-sky-600 text-white rounded-sm font-semibold px-3 py-1 disabled:opacity-50"
		>Create</button
	>
</form>
