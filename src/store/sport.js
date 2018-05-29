import { New } from '@/lib'
import Infinite from '@/lib/Infinite'

const state = {
	cached: [],
	infinite: null,
	complete: false
}

const actions = {
	init ({ commit, dispatch }) {
		let infinite = new Infinite({
			method: New.getList,
			additional: {
				type: 'sport'
			}
		})

		infinite.on('cached', n => commit('cacheSet', n))
		infinite.on('complete', n => commit('completeSet', n))

		commit('infiniteSet', infinite)
		dispatch('start')
	},
	async start ({ commit, dispatch, state }) {
		await state.infinite.start()
	},
	async more ({ commit, dispatch, state }, payload) {
		await state.infinite.more(payload)
	}
}

const mutations = {
	infiniteSet: (state, payload) => state.infinite = payload,
	cacheSet: (state, payload) => state.cached = payload,
	completeSet: (state, payload) => state.complete = payload,
}

const getters = {

}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
