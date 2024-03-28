<script lang="ts">
  import { browser } from "$app/environment";

  export let iframeSrc: string = "";
  export let svelteCheckOutcome: number = 1;
  let iframe: HTMLIFrameElement;

  $: if (iframe) iframe.src = iframeSrc;
</script>

<div class="content">
  {#if svelteCheckOutcome !== 1}
    {#if browser}
      <iframe bind:this={iframe} title="Output" />
    {/if}
  {:else}
    <div style="display: flex; align-items: center;flex-direction:column;">
      <h2>Oh no it's all broken!</h2>
      <p>Beep boop the computers are full of strings</p>
    </div>
  {/if}
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 0;
    height: 100%;
    max-height: 100%;
    --menu-width: 5.4rem;
  }

  iframe {
    width: 100%;
    height: 100%;
    flex: 1;
    resize: none;
    box-sizing: border-box;
    border: none;
  }
</style>
