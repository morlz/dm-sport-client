<template>
	<q-layout-drawer side="left" v-model="open">
		<q-scroll-area class="MenuDrawerScroll" :style="{ height: '100%' }" >
			<q-list no-border>
				<q-list-header>
					Меню
				</q-list-header>

				<q-item v-for="item, index in items" :to="item.path" :key="index">
					<q-item-main>
						{{ item.name }}
					</q-item-main>
				</q-item>
			</q-list>
		</q-scroll-area>
	</q-layout-drawer>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters('auth', [
			'logined'
		]),
		...mapGetters('menu', [
			'items'
		]),
		...mapState('menu', [
			'drawerOpen'
		]),
		open: {
			get () {
				return this.drawerOpen
			},
			set (n) {
				this.$store.commit('menu/drawerOpenSet', n)
			}
		}
	},

	created () {

	}
}
</script>

<style lang="stylus">
.MenuDrawerScroll
	box-sizing border-box
	padding-top 20px
	transition all .3s ease-in-out

</style>
