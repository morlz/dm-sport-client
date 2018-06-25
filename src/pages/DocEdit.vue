<template>
<q-page padding v-if="data && $store.getters['auth/logined']" class="DocEdit">
	<q-field>
		<q-input v-model="editFields.title" float-label="Название"/>
	</q-field>

	<q-field helper="Файл">
		<input type="file" @change="editFields.file = $event.target.files[0]"/>
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
import { Doc } from '@/lib'

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
		...mapState('doc', {
			content: state => state.current
		}),
		data () {
			if (this.create) {
				this.editFields = new Doc()
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
			this.$store.dispatch('doc/save', this.editFields)
		}
	},
	created () {
		if (this.create) return
		this.$store.dispatch('doc/getOne', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.DocEdit
	display grid
	grid-gap 10px
	align-content start
</style>
