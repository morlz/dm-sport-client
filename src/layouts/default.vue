<template>
<q-layout view="lHh Lpr lFf" @scroll="scroll">
	<q-layout-header>
		<div class="HeaderContainer">
			<div class="Header" :class="{ 'Header__big': !top }">
				<img src="statics/logo.png" class="Header__logo" @click="$router.push('/')"/>

				<div>
					<div class="Header__textWrapper" :style="{ height: !top ? '80px' : '0' }">
						<div class="Header__text">
							Управление по делам молодежи, физической культуры и спорта <br>
							администрации Дмитровского муниципального района Московской области
						</div>
					</div>

					<div class="Header__bottom">
						<app-menu/>

						<app-social/>
					</div>
				</div>
			</div>
		</div>
	</q-layout-header>

	<q-page-container :style="{ paddingTop: '150px' }">
		<router-view :key="$route.fullPath"/>
	</q-page-container>
</q-layout>
</template>

<script>
import {
	openURL,
	QSlideTransition
} from 'quasar'
import AppMenu from '@/components/AppMenu'
import AppSocial from '@/components/AppSocial'

export default {
	name: 'LayoutDefault',
	components: {
		AppMenu,
		AppSocial,
		QSlideTransition
	},
	data() {
		return {
			top: 0
		}
	},
	methods: {
		openURL,
		scroll (e) {
			this.top = e.position
		}
	},
	created () {
		this.$store.dispatch('auth/getUserData')
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
		overflow hidden
		transition all .3s ease-in-out

	&__bottom
		display grid
		grid-gap 10px
		grid-template-columns 1fr max-content
		justify-content space-between
		margin 0 1px
</style>
