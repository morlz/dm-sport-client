<template>
<q-page padding v-if="content" class="Doc">
	<h1 class="Doc__title">{{ content.title }}</h1>

	<div v-if="content.isImage">
		<img :src="content.href" class="Doc__preview"/>
	</div>

	<q-list no-border>
		<q-item>
			<q-item-main>Добавлен:</q-item-main>

			<q-item-side right>
				{{ $moment(content.created_at).format('DD MMMM YYYY HH:mm:ss') }}
			</q-item-side>
		</q-item>
		<q-item>
			<q-item-main>Файл изменён:</q-item-main>

			<q-item-side right>
				{{ $moment(content.updated_at).format('DD MMMM YYYY HH:mm:ss') }}
			</q-item-side>
		</q-item>
		<q-item>
			<q-item-main>
				Оригинальное имя:
			</q-item-main>

			<q-item-side right>
				 {{ content.name }}
			</q-item-side>
		</q-item>
		<q-item>
			<q-item-main>
				Размер:
			</q-item-main>

			<q-item-side right>
				{{ content.sizeString }}
			</q-item-side>
		</q-item>
	</q-list>

	<q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="$store.getters['auth/logined']">
		<q-btn round color="negative" icon="delete" @click="$store.dispatch('doc/delete', $route.params.id)" wait-for-ripple>
			<q-tooltip self="bottom left">
				Удалить
			</q-tooltip>
		</q-btn>
	</q-page-sticky>
</q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState('doc', {
			content: state => state.current
		})
	},
	created () {
		this.$store.dispatch('doc/getOne', this.$route.params.id)
	}
}
</script>

<style lang="stylus">
.Doc
	margin 0 auto
	max-width 1000px

	&__title
		margin-top 0
		padding 0

	&__preview
		max-width 100%
		margin 0 auto
</style>
