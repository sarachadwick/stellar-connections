<script lang="ts">
  import { EditorState } from "@codemirror/state";
  import { svelte } from "@replit/codemirror-lang-svelte";
  import { EditorView, basicSetup } from "codemirror";
  import { onMount } from "svelte";
  import "./codemirror.css";

  export let editorTextValue: string = ``;
  export let writeIndexJS: (content: any) => Promise<void>;
  let container: HTMLElement;

  let startState = EditorState.create({
    doc: editorTextValue,
    extensions: [basicSetup, svelte()],
  });

  let view: EditorView;

  onMount(() => {
    view = new EditorView({
      state: startState,
      parent: container,
      async dispatch(transaction) {
        view.update([transaction]);
        writeIndexJS(transaction.startState.doc.toString());
      },
    });

    return () => {
      view.destroy();
    };
  });
</script>

<div class="container" bind:this={container}></div>

<style>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
