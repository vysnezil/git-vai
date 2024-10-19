<script>
    import "../app.css";
    import Navbar from "../navbar.svelte";
</script>

<style lang="postcss">
	.con {
      margin-top: 0;
	}
</style>

<Navbar />
<div class="con flex justify-center items-start h-full px-2 pt-8">
	<slot />
</div>


