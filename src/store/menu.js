

const state = {
	menu: [
		{ name: 'Новости', path: '/' },
		{ name: 'История', path: '/history' },
		{ name: 'Дмитровский район', path: '/partner' },
		{ name: 'Структура управления', path: '/struct' },
		{ name: 'Контакты', path: '/contacts' },
		{ name: 'Видео', path: '/videos' },
	]
}

const actions = {

}

const mutations = {

}

const getters = {
	items: state => state.menu
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
