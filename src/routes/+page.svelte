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

<h1>start a new project</h1>

<fieldset>
	<div class="field">
		<label for="name">Project name</label>
		<input id="name" type="text" bind:value={projectName} />
	</div>
</fieldset>

<fieldset>
	<div class="radios">
		<h2>Git:</h2>
		{#each gitOptions as option, i}
			<div class="field">
				<input type="radio" name="git" id="g{i}" />
				<label for="g{i}">{option.label}{option.dynamic ? projectName : ''}</label>
			</div>
		{/each}
	</div>

	<div class="radios">
		<h2>Initialize project with:</h2>
		{#each initScripts as option, i}
			<div class="field">
				<input type="radio" name="script" id="g{i}" />
				<input type="text" bind:value={option} />
			</div>
		{/each}
	</div>
</fieldset>

<button>Create</button>
