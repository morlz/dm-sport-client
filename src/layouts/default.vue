<template>
<q-layout view="lHh LpR lFf" @scroll="scroll" @resize="resize">
	<app-header :top="top"/>

	<menu-drawer v-if="mobile"/>
	<anounce-drawer :big="!top && !mobile"/>

	<q-page-container :style="{ paddingTop: mobile ? '50px' : '150px' }">
		<router-view :key="$route.fullPath"/>
	</q-page-container>
</q-layout>
</template>

<script>
import {
	openURL,
	QSlideTransition
} from 'quasar'

import AnounceDrawer from '@/components/AnounceDrawer'
import MenuDrawer from '@/components/MenuDrawer'
import AppHeader from '@/components/AppHeader'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
	name: 'LayoutDefault',
	components: {
		AppHeader,
		QSlideTransition,
		AnounceDrawer,
		MenuDrawer
	},
	data() {
		return {
			top: 0
		}
	},
	computed: {
		...mapState('menu', [
			'mobile'
		])
	},
	methods: {
		openURL,
		scroll (e) {
			this.top = e.position
		},
		resize ({ width }) {
			this.$store.commit('menu/mobileSet', width < 1000)
		}
	},
	created () {
		this.$store.dispatch('auth/getUserData')
	}
}
</script>

<style lang="stylus">

</style>
