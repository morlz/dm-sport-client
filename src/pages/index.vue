<template>
<q-page padding class="PageNews">
	<q-scroll-observable @scroll="scroll"/>

	<h1>Молодёжная политика</h1>

	<h1>Физическая культура и спорт</h1>

	<div class="NewsList" ref="politics">
		<new-card v-for="item, index in politics" :key="index" :content="item" />
	</div>

	<div class="NewsList" ref="sport">
		<new-card v-for="item, index in sport" :key="index" :content="item" />
	</div>

	<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="primary" icon="add" wait-for-ripple @click="$router.push('/new/create')">
			<q-tooltip self="bottom left">
				Добавить
			</q-tooltip>
		</q-btn>
	</q-page-sticky>
</q-page>
</template>

<script>
import NewCard from '@/components/NewCard'
import { mapState } from 'vuex'
import { QScrollObservable } from 'quasar'


export default {
	name: 'PageIndex',
	components: {
		NewCard,
		QScrollObservable
	},
	data () {
		return {
			loading: {
				sport: false,
				politics: false
			}
		}
	},
	computed: {
		...mapState('politics', {
			politics: state => state.cached,
			politics_complete: state => state.complete
		}),
		...mapState('sport', {
			sport: state => state.cached,
			sport_complete: state => state.complete
		}),
	},
	methods: {
		scroll (e) {
			if (!this.loading.sport && !this.sport_complete)
				this.loadSport(e.position)

			if (!this.loading.politics && !this.politics_complete)
				this.loadPolitics(e.position)
		},
		loadPolitics (pos) {
			if (!this.$refs.politics) return
			if (this.$refs.politics.offsetHeight - window.innerHeight - pos < 800) {
				this.loading.politics = true
				this.$store.dispatch('politics/more', {
					loaded: a => this.loading.politics = false,
					complete: a => a
				})
			}
		},
		loadSport (pos) {
			if (!this.$refs.sport) return
			if (this.$refs.sport.offsetHeight - window.innerHeight - pos < 800) {
				this.loading.sport = true
				this.$store.dispatch('sport/more', {
					loaded: a => this.loading.sport = false,
					complete: a => a
				})
			}
		}
	},
	created () {
		this.$store.dispatch('politics/init')
		this.$store.dispatch('sport/init')
	}
}
</script>

<style lang="stylus">
.PageNews
	margin 0 auto
	display grid
	grid-gap 20px
	grid-template-columns 1fr 1fr
	grid-template-rows max-content 1fr

.NewsList
	display grid
	grid-gap 20px
	align-content start
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
</style>
