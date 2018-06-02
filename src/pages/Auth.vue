<template>
<q-page padding class="AuthPage">
	<q-card class="AuthPageForm" v-if="!logined">
		<q-card-title>
			Вход
		</q-card-title>

		<q-card-main class="AuthPageForm__inner">
			<q-field>
				<q-input v-model="login" float-label="Логин"/>
			</q-field>

			<q-field>
				<q-input v-model="pass" float-label="Пароль" type="password"/>
			</q-field>
		</q-card-main>

		<q-card-actions>
			<q-btn flat color="primary" @click="$store.dispatch('auth/signin')">Войти</q-btn>
		</q-card-actions>
	</q-card>

	<q-card class="AuthPageForm" v-else>
		<q-card-title>
			{{ $store.state.auth.user.login }}
		</q-card-title>

		<q-card-actions>
			<q-btn flat color="primary" @click="$store.commit('auth/signout')">Выйти</q-btn>
		</q-card-actions>
	</q-card>
</q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters('auth', [
			'logined'
		]),
		login: {
			get () {
				return this.$store.state.auth.login
			},
			set (val) {
				this.$store.commit('auth/loginSet', val)
			}
		},
		pass: {
			get () {
				return this.$store.state.auth.pass
			},
			set (val) {
				this.$store.commit('auth/passSet', val)
			}
		}
	}
}
</script>

<style lang="stylus">
.AuthPage
	display grid
	align-items center
	justify-items center

.AuthPageForm
	min-width 300px

	&__inner
		display grid
		grid-gap 10px
</style>
