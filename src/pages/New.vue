<template>
<q-page padding v-if="page" class="New">
	<h1 class="New__title">{{ page.title }}</h1>

	<img :src="page.image" v-if="page.image" class="New__image"/>

	<div class="New__content" v-html="page.content"/>

	<div class="New__video" v-if="page.video">
		<iframe class="New__frame" :src="page.video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
	</div>

	<q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="negative" icon="delete" @click="$store.dispatch('page/deleteNew', $route.params.id)" wait-for-ripple>
			<q-tooltip self="bottom left">
				Удалить
			</q-tooltip>
		</q-btn>
	</q-page-sticky>

	<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="primary" icon="edit" @click="$router.push(`${$route.path}/edit`)" wait-for-ripple>
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
	computed: {
		...mapState('page', {
			page: state => state.currentNew
		})
	},
	created () {
		this.$store.dispatch('page/getNew', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.New
	margin 0 auto
	max-width 1000px

	&__title
		margin-top 0
		padding 0

	&__image
		width 100%
		margin-bottom 15px

	&__video
		display grid
		align-items center
		justif-content center
		width 100%
		margin 15px 0

	&__frame
		max-width 100%
		width 800px
		height 600px
		margin 0 auto
</style>
