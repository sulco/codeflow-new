<script lang="ts">
    export let tags: string[] = [];
    export let name: string = '';
    export let command: string = '';
</script>

<button class="fieldset text-left">
    {#each tags as tag}
        <span
            class="absolute top-2 right-2 text-[10px] bg-slate-400 px-1 rounded-sm text-slate-900 uppercase font-semibold"
            >{tag}</span
        >
    {/each}
    <h2 class="mb-2">{name}</h2>
    <code class="block font-mono text-[10px] leading-snug">{command}</code>
</button>
