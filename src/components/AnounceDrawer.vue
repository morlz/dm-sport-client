<template>
	<q-layout-drawer side="right" v-model="open">
		<q-scroll-area class="DrawerScroll" :style="{ height: '100%' }" :class="{ 'DrawerScrollBig': big }">
			<q-list separator no-border>
				<q-list-header>
					Анонсы
				</q-list-header>

				<q-card class="AddAnounce" v-if="logined">
					<q-card-title>
						Добавить анонс
					</q-card-title>

					<q-card-main class="AddAnounce__inner">
						<q-input v-model="form.title" float-label="Название" type="textarea"/>
						<q-input v-model="form.image" float-label="Изображение"/>
						<q-datetime v-model="form.date" float-label="Дата"/>
						<q-btn color="primary" class="AddAnounce__button" @click="add" :disable="!form.title || !form.date">Добавить</q-btn>
					</q-card-main>
				</q-card>

				<q-card v-for="anounce, index in anounces" :key="index" class="Anounce">
					<q-card-media v-if="anounce.image">
						<img :src="anounce.image" class="Anounce__image"/>
					</q-card-media>

					<q-card-title>
						{{ anounce.title }}

						<div slot="subtitle">
							{{ $moment(anounce.date).format('DD MMMM YYYY') }}
						</div>
					</q-card-title>

					<q-card-actions v-if="logined">
						<q-btn color="negative" icon="delete" flat @click="remove(anounce)"/>
					</q-card-actions>
				</q-card>

				<q-item v-if="!anounces.length">
					<q-item-main label="Анонсов нет"/>
				</q-item>
			</q-list>
		</q-scroll-area>
	</q-layout-drawer>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { Anounce } from '@/lib'

export default {
	props: {
		big: Boolean
	},
	data () {
		return {
			form: {
				title: '',
				image: '',
				date: ''
			}
		}
	},
	computed: {
		...mapGetters('anounce', [
			'anounces',
			'drawerOpen'
		]),
		...mapGetters('auth', [
			'logined'
		]),
		open: {
			get () {
				return this.drawerOpen
			},
			set (n) {
				this.$store.commit('anounce/drawerOpenSet', n)
			}
		}
	},
	methods: {
		add () {
			this.$store.dispatch('anounce/add', new Anounce(this.form))
			this.form = {
				title: '',
				image: '',
				date: ''
			}
		},
		remove (anounce) {
			this.$store.dispatch('anounce/delete', anounce)
		}
	},
	created () {
		this.$store.dispatch('anounce/get')
	}
}
</script>

<style lang="stylus">
.DrawerScroll
	box-sizing border-box
	padding-top 20px
	transition all .3s ease-in-out

.DrawerScrollBig
	padding-top 100px

.AddAnounce
	margin 10px
	&__inner
		display grid
		grid-gap 10px

	&__button
		justify-self start

.Anounce
	margin 10px
	&__image
		width 100%
</style>
