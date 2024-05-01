<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let options: string[] = []
	export let selected: string = ''

	const dispatch = createEventDispatcher()

	const handleChange = () => {
		dispatch('change', selected)
	}
</script>

<select class="form-select" bind:value={selected} on:change={handleChange}>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>
