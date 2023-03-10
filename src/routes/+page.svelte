<script lang="ts">
	import { goto } from '$app/navigation';
	import { kebabCase } from 'lodash-es';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Codeflow from '../components/codeflow.svelte';
	import Git from '../components/git.svelte';
	import Github from '../components/github.svelte';
	import Gitlab from '../components/gitlab.svelte';
	import NoGit from '../components/no-git.svelte';
	import StackIcon from '../components/stack-icon.svelte';

	let ready = false;
	onMount(() => (ready = true));
	let duration = 400;
	let stagger = 100;

	let projectName = 'demo';
	let gitOption = 1;
	let initOption = 3;
	let nameInputRef: HTMLInputElement;

	let gitOptions = [
		{ label: 'github.com/sulco/', logo: Github, dynamic: true },
		{ label: 'gitlab.com/sulco/', logo: Gitlab, dynamic: true },
		{ label: '`git init` only', logo: Git, dynamic: false },
		{ label: 'no git', logo: NoGit, dynamic: false }
	];

	let initScripts = [
		'npm create vite@latest',
		'npx ng new',
		'npm init video',
		'pnpm create next-app --typescript'
	];

	let newScript = '';

	onMount(() => {
		setTimeout(() => {
			nameInputRef.focus();
			nameInputRef.selectionStart = 0;
			nameInputRef.selectionEnd = nameInputRef.value.length;
		}, stagger);
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

	function fadeIn(stagger: number) {
		return {
			y: -20,
			duration,
			stagger
		};
	}
</script>

<svelte:head>
	<title>Start a new project</title>
</svelte:head>

<header class="flex gap-2">
	<Codeflow class="w-12 mix-blend-luminosity opacity-50 drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]" />
	<h1 class="my-6 text-xl text-white opacity-25 drop-shadow-[2px_4px_6px_rgba(0,0,0,1)]">
		start a new project
	</h1>
</header>

{#if ready}
	<form class="grid gap-4" on:submit={handleSubmit} transition:fly={fadeIn()}>
		<fieldset class="fieldset relative">
			<label for="name" class="block mb-1">Project name:</label>
			<input
				autocomplete="off"
				id="name"
				bind:this={nameInputRef}
				class="bg-gray-900 px-2 outline outline-slate-500/10 outline-1 focus:outline-slate-400/40 text-lg rounded-sm"
				type="text"
				bind:value={projectName}
			/>
			<div class="absolute right-8 top-4">
				<StackIcon
					value={initScripts[initOption]}
					class="w-14 absolute right-4 max-w-none drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]"
				/>
				<svelte:component
					this={gitOptions[gitOption].logo}
					class="w-6 h-6 absolute right-0 top-10 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]"
				/>
			</div>
		</fieldset>

		<p class="text-xs mt-4 text-gray-500" transition:fly={fadeIn(stagger * 0.5)}>
			💡 Your previous choices are already selected so you can hit [enter] to create a project with
			the same setup
		</p>
		<fieldset class="fieldset" transition:fly={fadeIn(stagger * 0.8)}>
			<h2 class="font-semibold mb-2">Git:</h2>
			<section>
				{#each gitOptions as option, i}
					<div
						class="flex gap-2 mb-1 rounded-lg overflow-hidden transition-all {gitOption === i
							? 'bg-slate-400/10'
							: ''}"
					>
						<input
							type="radio"
							name="git"
							id="g{i}"
							value={i}
							bind:group={gitOption}
							class="cursor-pointer"
							hidden
						/>
						<label for="g{i}" class="cursor-pointer flex w-full gap-2 p-3 hover:bg-slate-400/5"
							><svelte:component
								this={option.logo}
								class="w-6 h-6 {gitOption === i ? 'opacity-100' : 'opacity-50'}"
							/>
							{option.label}{option.dynamic ? kebabCase(projectName) : ''}</label
						>
					</div>
				{/each}
			</section>
		</fieldset>

		<fieldset class="fieldset" transition:fly={fadeIn(stagger * 1.5)}>
			<h2 class="font-semibold mb-2">Initialization script:</h2>
			{#each initScripts as option, i}
				<div
					class="flex gap-2 mb-1 items-center rounded-lg overflow-hidden relative transition-all 
				{initOption === i ? 'bg-slate-400/10' : ''}"
				>
					<input
						type="radio"
						name="script"
						id="g{i}"
						value={i}
						bind:group={initOption}
						class="cursor-pointer"
						hidden
					/>
					<StackIcon
						value={option}
						class="absolute left-2 w-6 {initOption === i ? 'opacity-100' : 'opacity-50'}"
					/>
					<input
						type="text"
						bind:value={option}
						on:click={() => (initOption = i)}
						on:focus={handleFocus}
						class="rounded bg-transparent hover:bg-gray-900 focus:bg-gray-900 p-3 pl-12 focus:outline font-mono text-xs w-full"
					/>
					<button
						type="button"
						class="absolute right-2 opacity-0 hover:opacity-80"
						on:click={() => {
							initScripts = [...initScripts.slice(0, i), ...initScripts.slice(i + 1)];
						}}>❌</button
					>
				</div>
			{/each}
			<div class="flex gap-2 mb-1 items-center rounded-lg overflow-hidden relative transition-all">
				<input
					type="radio"
					name="script"
					id="g{initScripts.length}"
					value={initScripts.length}
					bind:group={initOption}
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
		</fieldset>

		<button
			transition:fly={fadeIn(stagger * 2.5)}
			disabled={!projectName.length}
			class="justify-self-end bg-sky-600 text-white rounded-sm font-semibold px-3 py-1 disabled:opacity-50"
			>Create</button
		>
	</form>
{/if}
