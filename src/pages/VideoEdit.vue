<template>
<q-page padding v-if="data && $store.getters['auth/logined']" class="VideoEdit">
	<q-field>
		<q-input v-model="editFields.title" float-label="Название"/>
	</q-field>

	<q-field helper="Ссылка на видео">
		<q-input v-model="editFields.url" float-label="Ссылка на видео"/>
	</q-field>

	<q-page-sticky position="bottom-right" :offset="[18, 18]">
		<q-btn round color="primary" icon="save" wait-for-ripple @click="save">
			<q-tooltip self="bottom left">
				Сохранить
			</q-tooltip>
		</q-btn>
	</q-page-sticky>
</q-page>
</template>

<script>
import { mapState } from 'vuex'
import { Video } from '@/lib'

export default {
	props: {
		create: Boolean
	},
	data () {
		return {
			editFields: {}
		}
	},
	computed: {
		...mapState('video', {
			content: state => state.current
		}),
		data () {
			if (this.create) {
				this.editFields = new Video()
				return true
			} else {
				if (!this.content) return
				this.editFields = this.content.clone()
				return this.content
			}
		}
	},
	methods: {
		save () {
			this.$store.dispatch('video/save', this.editFields)
		}
	},
	created () {
		if (this.create) return
		this.$store.dispatch('video/getOne', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.VideoEdit
	display grid
	grid-gap 10px
	align-content start
</style>
