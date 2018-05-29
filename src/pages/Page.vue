<template>
<q-page padding class="Page" v-if="page">
	<h1>{{ page.title }}</h1>

	<div class="Page__content" v-html="page.content"/>

	<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="primary" icon="edit" @click="$router.push(`page/${id}/edit`)" wait-for-ripple>
			<q-tooltip self="bottom left">
				Редактировать
			</q-tooltip>
		</q-btn>
	</q-page-sticky>
</q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: {
		id: {
			type: Number
		}
	},
	computed: {
		...mapState('page', {
			page: state => state.current
		})
	},
	created () {
		this.$store.dispatch('page/getPage', this.id || this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.Page
	max-width 1000px
	margin 0 auto
</style>
