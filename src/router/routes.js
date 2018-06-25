export default [
	{
		path: '/',
		component: () => import ('layouts/default'),
		children: [
			{ path: 'news', redirect: '/' },
			{ path: '', component: () => import ('pages/index') },
			{ path: 'docs', component: () => import ('pages/DocList') },
			{ path: 'doc/create', component: () => import ('pages/DocEdit'), props: { create: true } },
			{ path: 'docs/:id', component: () => import ('pages/Doc') },
			{ path: 'contacts', component: () => import ('pages/Page'), props: { id: 4 } },
			{ path: 'history', component: () => import ('pages/Page'), props: { id: 1 } },
			{ path: 'partner', component: () => import ('pages/Page'), props: { id: 2 } },
			{ path: 'struct', component: () => import ('pages/Page'), props: { id: 3 } },
			{ path: 'auth', component: () => import ('pages/Auth') },
			{ path: 'news/:id', component: () => import ('pages/New') },
			{ path: 'news/:id/edit', component: () => import ('pages/NewEdit') },
			{ path: 'new/create', component: () => import ('pages/NewEdit'), props: { create: true } },
			{ path: 'page/:id', component: () => import ('pages/Page') },
			{ path: 'page/:id/edit', component: () => import ('pages/PageEdit') },
			{ path: 'videos', component: () => import ('pages/VideoList') },
			{ path: 'videos/:id', component: () => import ('pages/Video') },
			{ path: 'videos/:id/edit', component: () => import ('pages/VideoEdit') },
			{ path: 'video/create', component: () => import ('pages/VideoEdit'), props: { create: true } },
		]
	},

	{ // Always leave this as last one
		path: '*',
		component: () => import ('pages/404')
	}
]
