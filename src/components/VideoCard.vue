<template>
<q-card v-ripple class="VideoCard" @click.native="clickHandler">
	<q-card-media @click.native.stop>
		<iframe class="VideoCard__frame" :src="content.url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen/>
	</q-card-media>

	<q-card-title>
		{{ content.title }}

		<div slot="subtitle" class="VideoCard__subtitle">
			{{ $moment(content.created_at).format('DD MMMM YYYY') }}
		</div>
	</q-card-title>

	<q-card-actions class="VideoCard__actions" v-if="$store.getters['auth/logined']">
		<q-btn flat color="primaty" icon="edit" @click.stop="$router.push(`/videos/${content.id}/edit`)">Редактировать</q-btn>
		<q-btn flat color="negative" icon="delete" @click.stop="$store.dispatch('video/delete', content.id)">Удалить</q-btn>
	</q-card-actions>
</q-card>
</template>

<script>
import {
	mapGetters
} from 'vuex'

export default {
	props: {
		content: {
			type: Object,
			required: true
		}
	},
	methods: {
		clickHandler() {
			setTimeout(a => this.$router.push('/videos/' + this.content.id), 300)
		}
	}
}
</script>

<style lang="stylus">
.VideoCard
	width 400px
	position relative
	cursor pointer
	user-select none
	display grid
	align-items start

	&__frame
		width 400px
		height 300px

	&__actions
		align-self end
</style>
