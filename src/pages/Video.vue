<template>
<q-page padding v-if="content" class="Video">
	<h1 class="Video__title">{{ content.title }}</h1>

	<div class="Video__date">
		Добавлено {{ $moment(content.created_at).format('DD MMMM YYYY') }}
	</div>

	<div v-if="content.url" class="Video__content">
		<iframe class="Video__frame" :src="content.url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
	</div>

	<q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="negative" icon="delete" @click="$store.dispatch('video/delete', $route.params.id)" wait-for-ripple>
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
		...mapState('video', {
			content: state => state.current
		})
	},
	created () {
		this.$store.dispatch('video/getOne', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.Video
	margin 0 auto
	max-width 1000px

	&__title
		margin-top 0
		padding 0

	&__content
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
