<script lang="ts">
	import { kebabCase } from 'lodash-es';
	import { gitOptions } from './git-options';

	export let projectName = '';
	export let value = 1;
</script>

<section>
	{#each gitOptions as option, i}
		<div
			class="flex gap-2 mb-1 rounded-lg overflow-hidden transition-all {value === i
				? 'bg-slate-400/10'
				: ''}"
		>
			<input
				type="radio"
				name="git"
				id="g{i}"
				value={i}
				bind:group={value}
				class="cursor-pointer"
				hidden
			/>
			<label for="g{i}" class="cursor-pointer flex w-full gap-2 p-3 hover:bg-slate-400/5">
				<img
					src="git-icons/{option.logo}"
					alt=""
					class="w-6 h-6 {value === i ? 'opacity-100' : 'opacity-50'}"
				/>
				{option.label}{option.dynamic ? kebabCase(projectName) : ''}</label
			>
		</div>
	{/each}
</section>
