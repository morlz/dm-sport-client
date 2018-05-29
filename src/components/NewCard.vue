<template>
<q-card v-ripple class="NewCard" @click.stop.native="clickHandler">
	<q-card-media v-if="content.image">
		<img :src="content.image" />

		<q-card-title slot="overlay">
			{{ content.title }}

			<div slot="subtitle" class="New__subtitle">
				{{ $moment(content.created_at).format('DD MMMM YYYY') }}
			</div>
		</q-card-title>
	</q-card-media>

	<q-card-title v-else>
		{{ content.title }}

		<div slot="subtitle" class="New__subtitle">
			{{ $moment(content.created_at).format('DD MMMM YYYY') }}
		</div>
	</q-card-title>

	<q-card-main>
		{{ content.description }}
	</q-card-main>
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
			setTimeout(a => this.$router.push('/news/' + this.content.id), 300)
		}
	}
}
</script>

<style lang="stylus">
.NewCard
	position relative
	cursor pointer
	user-select none
</style>
