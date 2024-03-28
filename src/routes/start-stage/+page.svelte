<script lang="ts">
  import { onMount } from "svelte";
  import { WebContainer } from "@webcontainer/api";
  import { files } from "../../files";
  import "xterm/css/xterm.css";
  import Editor from "./Editor.svelte";
  import Output from "./Output.svelte";

  /** @type {import('@webcontainer/api').WebContainer}  */
  let webcontainer: WebContainer;

  let iframeSrc = "";
  let xterm: any;
  let fitAddonLibrary: any;
  let terminal: any;

  async function installDependencies() {
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

  async function doCompile() {
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

  async function writeIndexJS(content: any) {
    if (!webcontainer) return;
    await webcontainer.fs.writeFile("/App.svelte", content);
  }

  onMount(async () => {
    xterm = await import("xterm");
    fitAddonLibrary = await import("@xterm/addon-fit");
    terminal = new xterm.Terminal({
      convertEol: true,
    });
    let fitAddon = new fitAddonLibrary.FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(document.getElementById("terminal"));
    fitAddon.fit();

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

<nav>
  <a href="/">home</a>
</nav>

<h1>Stage 1</h1>
<p>Let's figure something out!</p>

<div style="display: flex;">
  <section style="flex-grow: 1; min-height:200;">
    <Editor
      editorTextValue={files["App.svelte"].file.contents}
      {writeIndexJS}
    />
  </section>
  <section style="flex-grow: 1;min-height:200;">
    <Output bind:iframeSrc />
  </section>
</div>
<div id="terminal" style="height:50%;"></div>
