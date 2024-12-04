<script>
    import { faPlus } from '@fortawesome/free-solid-svg-icons'

    import RepositoryList from '../../../repositoryList.svelte';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    const { data } = $props();
</script>

<RepositoryList title="{(data.user === data.username) ? 'My' : data.user} repositories" repos={data.repos} >
    <a href="/create" class="btn add-btn">
        <FontAwesomeIcon icon={faPlus} />
        <div class="s-hide">New repository</div>
    </a>
</RepositoryList>

<style lang="postcss">
    .add-btn {
        @apply bg-emerald-500 hover:bg-emerald-700;
        @apply gap-2;
    }
</style>