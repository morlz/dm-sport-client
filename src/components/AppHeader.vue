<template>
	<q-layout-header :reveal="mobile">
		<q-toolbar v-if="mobile">
			<q-btn flat round dense icon="menu" @click="leftClick" />
			<q-toolbar-title>dm-sport.ru</q-toolbar-title>
			<q-btn flat round dense icon="whatshot" @click="rightClick"  />
		</q-toolbar>

		<div class="HeaderContainer" v-else>
			<div class="Header" :class="{ 'Header__big': headerBig }">
				<img src="statics/logo.png" class="Header__logo" @click="$router.push('/')"/>

				<div>
					<div class="Header__textWrapper" :style="{ height: headerBig ? '80px' : '0' }">
						<div class="Header__text">
							Управление по делам молодежи, физической культуры и спорта <br>
							администрации Дмитровского муниципального района Московской области
						</div>

						<app-social/>
					</div>

					<div class="Header__bottom">
						<app-menu/>
					</div>
				</div>
			</div>
		</div>
	</q-layout-header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import AppMenu from '@/components/AppMenu'
import AppSocial from '@/components/AppSocial'

export default {
	components: {
		AppMenu,
		AppSocial
	},
	props: {
		top: Number
	},
	computed: {
		...mapState('menu', {
			mobile: state => state.mobile
		}),
		headerBig () {
			return !this.mobile && !this.top
		}
	},
	methods: {
		leftClick () {
			this.$store.commit('menu/drawerToggle')
		},
		rightClick () {
			this.$store.commit('anounce/drawerToggle')
		}
	}
}
</script>

<style lang="stylus">
.HeaderContainer
	height 50px

.Header
	padding 0 10px
	display grid
	grid-template-columns max-content 1fr max-content
	align-items center
	background #390668
	transition all .3s ease-in-out
	height 70px
	box-shadow 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12)

	&__logo
		margin 5px
		height 60px
		width 60px
		cursor pointer
		transition all .3s ease-in-out

	&__big
		height 150px

		.Header__logo
			height 140px
			width 140px

	&__text
		color white
		padding 20px
		opacity 0.65
		text-align left
		margin 0 5px

	&__textWrapper
		display grid
		grid-template-columns 1fr max-content
		overflow hidden
		transition all .3s ease-in-out

	&__bottom
		display grid
		grid-gap 10px
		grid-template-columns 1fr max-content
		justify-content space-between
		margin 0 1px
</style>
