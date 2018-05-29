<template>
<div class="Social">
	<div class="Social__vk">
		<a href="https://vk.com/udmfks_dmitrov">
			<img src="statics/vk.svg"/>
		</a>
	</div>

	<div class="Social__inst">
		<a href="https://www.instagram.com/udmfks_dmitrov/">
			<img src="statics/instagram.svg"/>
		</a>
	</div>
</div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.Social
	color white
	display grid
	grid-gap 20px
	grid-auto-flow column
	align-items center
	opacity .85
	margin 0 20px

	img
		width 32px
		height 32px
</style>
