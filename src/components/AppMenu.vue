<template>
<div class="Menu">
	<div class="Menu__item" v-for="item, index in items" @click="clickHandler(item)">
		{{ item.name }}
	</div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('menu', [
			'items'
		])
	},
	methods: {
		clickHandler (item) {
			this.$router.push(item.path)
		}
	}
}
</script>

<style lang="stylus">
.Menu
	height 70px
	display grid
	grid-auto-flow column
	justify-content start
	grid-gap 10px
	align-items center
	padding 0 20px
	box-sizing border-box
	&__item
		min-width max-content
		padding 5px
		text-align center
		text-transform uppercase
		opacity .8
		transition all .2s ease-in-out
		color white
		cursor pointer
		user-select none
		&:hover
			opacity 1
</style>
