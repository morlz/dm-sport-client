<template>
<q-card v-ripple class="DocCard" @click.native="clickHandler">
	<q-card-media v-if="content.isImage">
		<img :src="content.href" class="DocCard__preview"/>
	</q-card-media>

	<q-card-title>
		{{ content.title }}

		<div slot="subtitle" class="DocCard__subtitle">
			<q-list no-border class="DocCard__info">
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
		</div>
	</q-card-title>

	<q-card-actions class="DocCard__actions" v-if="$store.getters['auth/logined']">
		<q-btn flat color="primary" icon="link"  @click.stop="$router.push(`/docs/${content.id}`)">Перейти</q-btn>
		<q-btn flat color="negative" icon="delete" @click.stop="$store.dispatch('doc/delete', content.id)">Удалить</q-btn>
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
			let win = window.open(this.content.href, '_blank')
			win.focus()
		}
	}
}
</script>

<style lang="stylus">
.DocCard
	width 100%
	position relative
	cursor pointer
	user-select none
	display grid
	align-items start

	&__info
		.q-item
			display grid
			grid-gap 5px
			grid-auto-flow column
			.q-item-side-right
				word-wrap break-word

	&__actions
		align-self end
</style>
