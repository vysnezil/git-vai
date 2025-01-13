<script>
    import RepositoryList from '../../../../repositoryList.svelte';

    const { data } = $props();
</script>

<RepositoryList title="Shared repositories" repos={data.repos} >
    <div></div>
</RepositoryList>

<style lang="postcss">

</style>