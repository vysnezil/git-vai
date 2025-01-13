<script>
	const { data } = $props();
</script>

<div class="flex flex-col justify-center items-left">
	<div class="flex items-center">
		<div class="my-4 text-3xl text-gray-500">
			<a href="..">
				{ data.filename }
			</a>
		</div>
	</div>
	<textarea cols="100" rows="20" name="content" readonly class="outline-none block p-2.5 w-full
	text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-0">{ data.content }</textarea>
</div>