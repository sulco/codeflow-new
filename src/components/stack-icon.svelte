<script lang="ts">
	import { stacks } from './stacks';

	export let value = '';
	let stack = '';

	$: {
		for (let idx = 0; idx < stacks.length; idx++) {
			const [pattern, result] = stacks[idx];
			if (value.includes(pattern)) {
				stack = result;
				break;
			}
		}
	}
</script>

<img src="stacks/{stack}.svg" alt="" class:opacity-20={!value} class="w-6" />
