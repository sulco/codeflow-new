<script lang="ts">
	import { stacks } from './stacks';

	export let value = '';
	const defaultStack = 'webcontainer-api';
	let stack = defaultStack;

	$: {
		let matchFound = false;
		for (let idx = 0; idx < stacks.length; idx++) {
			const [pattern, result] = stacks[idx];
			if (value.includes(pattern)) {
				stack = result;
				matchFound = true;
				break;
			}
		}
		if (!matchFound) {
			stack = defaultStack;
		}
	}
</script>

<img src="stacks/{stack}.svg" alt="" class:opacity-20={!value} class={$$props.class} />
