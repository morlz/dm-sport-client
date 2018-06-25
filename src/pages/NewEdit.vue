<template>
<q-page padding v-if="data && $store.getters['auth/logined']" class="NewEdit">
	<q-field>
		<q-btn-toggle
			v-model="editFields.type"
			toggle-color="primary"
			:options="[
				{label: 'Молодёжная политика', value: 'politics'},
				{label: 'Физическая культура и спорт', value: 'sport'}
			]"
			/>
	</q-field>

	<q-field>
		<q-input v-model="editFields.title" float-label="Название"/>
	</q-field>

	<q-field>
		<q-datetime v-model="date" float-label="Дата создания" type="datetime"/>
	</q-field>

	<q-field helper="Ссылка на изображение">
		<q-input v-model="editFields.image" float-label="Изображение"/>
	</q-field>

	<q-field helper="Ссылка на видео">
		<q-input v-model="editFields.video" float-label="Видео"/>
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
	props: {
		create: Boolean
	},
	data () {
		return {
			editFields: {}
		}
	},
	computed: {
		...mapState('page', {
			page: state => state.currentNew
		}),
		data () {
			if (this.create) {
				this.editFields = new New()
				return true
			} else {
				if (!this.page) return
				this.editFields = this.page.clone()
				return this.page
			}
		},
		date: {
			get () {
				return this.editFields.created_at
			},
			set (n) {
				this.editFields.created_at = this.$moment(n).format('YYYY-MM-DD hh:mm:ss')
			}
		}
	},
	methods: {
		save () {
			this.$store.dispatch('page/saveNew', this.editFields)
		}
	},
	created () {
		if (this.create) return
		this.$store.dispatch('page/getNew', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.NewEdit
	display grid
	grid-gap 10px
	align-content start
</style>
