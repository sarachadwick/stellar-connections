
<script>
  import { SplitPane } from '@rich_harris/svelte-split-pane';
	import Editor from "./Editor.svelte";
	import Output from "./Output.svelte";

  const dividerColor = 'black';
  const dividerThickness = '20px';
</script>

<nav>
	<a href="/">home</a>
</nav>

<h1>Stage 1</h1>
<p>Let's figure something out!</p>

<SplitPane
  type="horizontal"
  id="main"
  min="100px"
  max="-100px"
  pos="50%"
  priority="min"
  --color={dividerColor}
  --thickness={dividerThickness}
>
  <section slot="a"><Editor /></section>
  <section slot="b"><Output /></section>
</SplitPane>

