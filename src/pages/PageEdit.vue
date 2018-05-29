<template>
<q-page padding v-if="data && $store.getters['auth/logined']" class="NewEdit">
	<q-field>
		<q-input v-model="editFields.title" float-label="Название"/>
	</q-field>

	<q-field>
		<q-editor v-model="editFields.content" />
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
import { New } from '@/lib'

export default {
	data () {
		return {
			editFields: {}
		}
	},
	computed: {
		...mapState('page', {
			page: state => state.current
		}),
		data () {
			if (!this.page) return
			this.editFields = this.page.clone()
			return this.page
		}
	},
	methods: {
		save () {
			this.$store.dispatch('page/savePage', this.editFields)
		}
	},
	created () {
		this.$store.dispatch('page/getPage', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.NewEdit
	display grid
	grid-gap 10px
	align-content start
</style>
