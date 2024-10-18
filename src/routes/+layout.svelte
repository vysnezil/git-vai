<script>
    import "../app.css";
    import Navbar from "../navbar.svelte";
</script>

<style lang="postcss">
	.con {
      margin-top: 20vh;
	}
</style>

<Navbar />
<div class="con flex justify-center items-start h-full">
	<slot />
</div>


