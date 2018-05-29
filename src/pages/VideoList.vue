<template>
<q-page padding class="PageVideos">
	<q-scroll-observable @scroll="scroll"/>
	<h1>Список видеозаписей</h1>

	<div class="VideoList" ref="scroll">
		<video-card v-for="item, index in videos" :key="index" :content="item" />
	</div>

	<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="primary" icon="add" wait-for-ripple @click="$router.push('/video/create')">
			<q-tooltip self="bottom left">
				Добавить
			</q-tooltip>
		</q-btn>
	</q-page-sticky>
</q-page>
</template>

<script>
import VideoCard from '@/components/VideoCard'
import { mapState } from 'vuex'
import { QScrollObservable } from 'quasar'


export default {
	name: 'PageIndex',
	components: {
		VideoCard,
		QScrollObservable
	},
	data () {
		return {
			loading: false
		}
	},
	computed: {
		...mapState('video', {
			videos: state => state.cached,
			videos_complete: state => state.complete
		}),
	},
	methods: {
		scroll (e) {
			if (!this.$refs.scroll || this.loading || this.videos_complete) return
			if (this.$refs.scroll.offsetHeight - window.innerHeight - e.position < 800) {
				this.loading = true
				this.$store.dispatch('video/more', {
					loaded: a => this.loading = false,
					complete: a => a
				})
			}
		},
	},
	created () {
		this.$store.dispatch('video/init')
	}
}
</script>

<style lang="stylus">
.PageVideos
	display grid
	grid-gap 20px
	grid-template-rows max-content 1fr

.VideoList
	display grid
	grid-template-columns repeat(auto-fill, minmax(400px, 1fr))
	grid-gap 20px
	align-content start
	justify-items center
</style>
