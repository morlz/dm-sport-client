

const state = {
	mobile: false,
	menu: [
		{ name: 'Новости', path: '/news' },
		{ name: 'История', path: '/history' },
		{ name: 'Дмитровский район', path: '/partner' },
		{ name: 'Структура управления', path: '/struct' },
		{ name: 'Контакты', path: '/contacts' },
		{ name: 'Видео', path: '/videos' },
		{ name: 'Документы', path: '/docs' },
	],
	drawerOpen: false
}

const actions = {

}

const mutations = {
	mobileSet: (state, payload) => state.mobile = payload,
	drawerOpenSet: (state, payload) => state.drawerOpen = payload,
	drawerToggle: state => state.drawerOpen = !state.drawerOpen
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
