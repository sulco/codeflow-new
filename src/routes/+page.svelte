<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Codeflow from '../components/codeflow.svelte';
	import { gitOptions } from '../components/git-options';
	import GitOptions from '../components/git-options.svelte';
	import StackIcon from '../components/stack-icon.svelte';
	import InitScripts from '../components/init-scripts.svelte';
	import { initScripts } from '../components/init-scripts';

	let ready = false;
	onMount(() => (ready = true));
	let duration = 400;
	let stagger = 100;

	let projectName = 'demo';
	let gitOption = 1;
	let initOption = 3;
	let nameInputRef: HTMLInputElement;

	onMount(() => {
		setTimeout(() => {
			nameInputRef.focus();
			nameInputRef.selectionStart = 0;
			nameInputRef.selectionEnd = nameInputRef.value.length;
		}, stagger);
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		goto('setting-up');
	}

	function fadeIn(stagger: number) {
		return {
			y: -20,
			duration,
			delay: stagger
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
	<form class="grid gap-4" on:submit={handleSubmit} transition:fly={fadeIn(0)}>
		<fieldset class="fieldset relative">
			<label for="name" class="block font-thin mb-1 opacity-50">Project name:</label>
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
				<img
					src={'git-icons/' + gitOptions[gitOption]?.logo}
					alt=""
					class="w-6 h-6 absolute right-0 max-w-none top-10 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]"
				/>
			</div>
		</fieldset>

		<p class="text-xs mt-4 text-gray-500" transition:fly={fadeIn(stagger * 0.5)}>
			💡 Your previous choices are already selected so you can hit [enter] to create a project with
			the same setup
		</p>
		<fieldset class="fieldset" transition:fly={fadeIn(stagger * 0.8)}>
			<h2 class="font-thin mb-2 opacity-50">Version control:</h2>
			<GitOptions {projectName} bind:value={gitOption} />
		</fieldset>

		<fieldset class="fieldset" transition:fly={fadeIn(stagger * 1.8)}>
			<h2 class="font-thin mb-2 opacity-50">Initialization script:</h2>
			<InitScripts bind:value={initOption} />
		</fieldset>

		<button
			transition:fly={fadeIn(stagger * 2.5)}
			disabled={!projectName.length}
			class="justify-self-end bg-sky-600 text-white rounded-sm font-semibold px-3 py-1 disabled:opacity-50"
			>Create</button
		>
	</form>
{/if}
