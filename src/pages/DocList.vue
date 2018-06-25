<template>
<q-page padding class="PageDocs">
	<q-scroll-observable @scroll="scroll"/>
	<h1>Список документов</h1>

	<div class="DocList" ref="scroll">
		<doc-card v-for="item, index in docs" :key="index" :content="item" />
	</div>

	<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="primary" icon="add" wait-for-ripple @click="$router.push('/doc/create')">
			<q-tooltip self="bottom left">
				Добавить
			</q-tooltip>
		</q-btn>
	</q-page-sticky>
</q-page>
</template>

<script>
import DocCard from '@/components/DocCard'
import { mapState } from 'vuex'
import { QScrollObservable } from 'quasar'


export default {
	name: 'PageIndex',
	components: {
		DocCard,
		QScrollObservable
	},
	data () {
		return {
			loading: false
		}
	},
	computed: {
		...mapState('doc', {
			docs: state => state.cached,
			docs_complete: state => state.complete
		}),
	},
	methods: {
		scroll (e) {
			if (!this.$refs.scroll || this.loading || this.docs_complete) return
			if (this.$refs.scroll.offsetHeight - window.innerHeight - e.position < 800) {
				this.loading = true
				this.$store.dispatch('doc/more', {
					loaded: a => this.loading = false,
					complete: a => a
				})
			}
		},
	},
	created () {
		this.$store.dispatch('doc/init')
	}
}
</script>

<style lang="stylus">
.PageDocs
	display grid
	grid-gap 20px
	grid-template-rows max-content 1fr

.DocList
	display grid
	grid-template-columns repeat(auto-fill, minmax(300px, 1fr))
	grid-gap 20px
	align-content start
	justify-items center
</style>
