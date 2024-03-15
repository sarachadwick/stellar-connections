<script lang="ts">
  import { onMount } from 'svelte';
	import { browser } from '$app/environment';
  import { editorText } from './stores.js';

  let iframe: HTMLIFrameElement;
  let editorTextValue: string;

  editorText.subscribe((value) => {
		editorTextValue = value;
	});

  onMount(() => {
    iframe.srcdoc = editorTextValue;
  });

  $: if(iframe) iframe.srcdoc = editorTextValue;
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 0;
		height: 100%;
		max-height: 100%;
		background: var(--sk-back-2);
		--menu-width: 5.4rem;
	}

	iframe {
		width: 100%;
		height: 100%;
		flex: 1;
		resize: none;
		box-sizing: border-box;
		border: none;
		background: var(--sk-back-2);
	}
</style>

<div class="content">
	{#if browser}
		<iframe bind:this={iframe} title="Output" />
	{/if}
</div>