<script lang="ts">
  import {EditorState} from "@codemirror/state";
  import {svelte} from "@replit/codemirror-lang-svelte";
  import {EditorView, basicSetup} from "codemirror"
  import { onMount } from 'svelte';
  import { editorText } from './stores.js';

  let container: HTMLElement;
  let editorTextValue: string = ``;

  // editorText.subscribe((value) => {
	// 	editorTextValue = value;
	// });

  let startState = EditorState.create({
    doc: editorTextValue,
    extensions: [basicSetup, svelte()]
  })

  let view: EditorView;

  onMount(() => {
    view = new EditorView({
      state: startState,
      parent: container,
      async dispatch(transaction) {
				view.update([transaction]);
        editorText.update((n) => transaction.startState.doc["text"].join(""))
        console.log("updating to: ", transaction.startState.doc["text"].join(""))
      }
		})


    return () => {
			view.destroy();
		};
  })
</script>

<div
	class="container"
	bind:this={container}></div>