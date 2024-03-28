<script>
  import alienGirl from "$lib/assets/AlienGirlTransparent.png";
  import title from "$lib/assets/Title.png";
</script>

<div class="title-display">
  <img src={title} alt="logo" style="width: 40vw" />

  <div class="home-display">
    <img src={alienGirl} alt="alien girl protagonist" class="alien-girl" />
    <div class="problem-statement">
      <p>
        A bunch of Svelte settlers have come the wild and untamed moon of
        Typescript. The settlers are excited to begin building a new Svelte hab
        to share with the native typescript inhabitants.
      </p>
      <p>
        There's a problem though! Typescript has a lot of powerful natural
        resources, but you can only use them to build your Svelte components if
        you know how to use them.
      </p>
      <p>
        It's up to the Typescript aliens to teach the Svelte settlers to use
        their tools if they're all going to coexist in harmony!
      </p>
      <p>Wanna help? <a href="/start-stage">Start here</a>!</p>
    </div>
  </div>
</div>

<style>
  .title-display {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .home-display {
    display: flex;
    align-items: center;
  }

  .alien-girl {
    max-height: 40vh;
  }

  .problem-statement {
    max-width: 30vw;
  }
</style>
