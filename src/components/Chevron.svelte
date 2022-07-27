<script lang="ts">
  export let open = false;
  export let onClick = () => {
    open = !open;
  };
</script>

<style>
  :root {
    --transition-duration: 500ms;
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  svg {
    height: 1rem;
    stroke: white;
    background-color: gray;
    transition: transform var(--transition-duration);
  }

  .open {
    transform: rotate(180deg);
  }
</style>

<button on:click="{onClick}">
  <svg
    class:open
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="3"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
</button>