<script lang="ts">
	let projectName = 'demo';

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
</script>

<h1 class="my-6 text-xl text-gray-400">start a new project</h1>

<div class="grid gap-4">
	<fieldset class="fieldset">
		<div class="field">
			<label for="name" class="block mb-1">Project name:</label>
			<input
				id="name"
				class="bg-gray-900 px-2 focus:outline"
				type="text"
				bind:value={projectName}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset grid grid-cols-2">
		<div class="radios">
			<h2 class="font-semibold mb-2">Git:</h2>
			{#each gitOptions as option, i}
				<div class="flex gap-2 mb-1">
					<input type="radio" name="git" id="g{i}" class="cursor-pointer" />
					<label for="g{i}" class="cursor-pointer"
						>{option.label}{option.dynamic ? projectName : ''}</label
					>
				</div>
			{/each}
		</div>

		<div class="radios">
			<h2 class="font-semibold mb-2">Initialize project with:</h2>
			{#each initScripts as option, i}
				<div class="flex gap-2 mb-1">
					<input type="radio" name="script" id="g{i}" class="cursor-pointer" />
					<input
						type="text"
						bind:value={option}
						class="bg-transparent hover:bg-gray-900 focus:bg-gray-900 px-2 py-1 focus:outline font-mono text-xs w-full"
					/>
				</div>
			{/each}
		</div>
	</fieldset>

	<button class="justify-self-end bg-sky-600 text-white rounded-sm font-semibold px-3 py-1"
		>Create</button
	>
</div>
