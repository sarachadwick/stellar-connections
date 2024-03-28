<script lang="ts">
  import { onMount } from "svelte";
  import { WebContainer } from "@webcontainer/api";
  import { files } from "../../files";
  import "xterm/css/xterm.css";
  import Editor from "./Editor.svelte";
  import Output from "./Output.svelte";

  /** @type {import('@webcontainer/api').WebContainer}  */
  let webcontainer: WebContainer;

  let iframeSrc: string = "";
  let svelteCheckOutcome: number = 1;

  let xterm: any;
  let fitAddonLibrary: any;
  let terminal: any;

  async function installDependencies(): Promise<number> {
    const installProcess = await webcontainer.spawn("npm", ["install"]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
    return installProcess.exit;
  }

  async function doCompile(): Promise<number> {
    const compileProcess = await webcontainer.spawn("npm", ["run", "dev"]);
    compileProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );

    webcontainer.on("server-ready", (port, url) => {
      iframeSrc = url;
    });

    return compileProcess.exit;
  }

  async function writeIndexJS(content: any): Promise<void> {
    if (!webcontainer) return;
    await webcontainer.fs.writeFile("/App.svelte", content);
  }

  async function svelteCheck(): Promise<void> {
    const svelteCheckProcess = await webcontainer.spawn("npm", [
      "run",
      "check",
    ]);
    svelteCheckProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      })
    );
    svelteCheckOutcome = await svelteCheckProcess.exit;
  }

  onMount(async () => {
    // Load terminal
    xterm = await import("xterm");
    fitAddonLibrary = await import("@xterm/addon-fit");
    terminal = new xterm.Terminal({
      convertEol: true,
    });
    let fitAddon = new fitAddonLibrary.FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(document.getElementById("terminal"));
    fitAddon.fit();

    // Boot webcontainer
    webcontainer = await WebContainer.boot();
    await webcontainer.mount(files);

    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error("Installation failed");
    }

    const exitCodeCompile = await doCompile();
    if (exitCodeCompile !== 0) {
      throw new Error("Compile failed");
    }
  });
</script>

<h1>The case of the mysterious malformed data</h1>

<div style="display: flex;">
  <section class="problem-statement">
    <p>
      The Svelte settlers are building a moonbase computer. As we all know,
      computers are made of zeros and ones.
    </p>
    <p>
      When the svelte settlers are trying to mine their binary digits, they keep
      getting stray strings and booleans, which gums up the works of their
      computers!
    </p>
    <p>
      Good thing the Typescript aliens know how to find pure, unadulterated
      numerical veins!
    </p>
    <p>
      Add a number value to binaryDigits (which has a <b>TYPE</b> of `number`) and
      then click "Go Go Type Check" to save the settlers computers!
    </p>
    <button on:click={svelteCheck}>Go Go Type Check</button>
  </section>
  <section style="flex-grow: 1;">
    <Editor
      editorTextValue={files["App.svelte"].file.contents}
      {writeIndexJS}
    />
  </section>
  <section style="flex-grow: 1;">
    <Output bind:iframeSrc {svelteCheckOutcome} />
  </section>
</div>
<div id="terminal" style="height:200px;"></div>

<style>
  .problem-statement {
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
    max-width: 300px;
  }
</style>
