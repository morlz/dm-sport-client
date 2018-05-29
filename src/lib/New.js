import BaseModel from '@/lib/BaseModel'
import api from '@/api'


export default class New extends BaseModel {
	constructor (arg) {
		super({
			type: 'politics',
			title: '',
			content: '',
			image: '',
			video: '',
			...arg
		})
	}

	static async getList (params) {
		let res = await api.get('news', params)
		if (Array.isArray(res))
			res = res.map(el => new New(el))

		return res || []
	}

	static async delete (id) {
		return new New(await api.delete('/new', { id }))
	}

	static async getOne (id) {
		return new this(await api.get('/new', { id }))
	}

	get description () {
		return this.content.replace( /<\/?[^>]+>/g,'' ).substr(0, 300) + '...'
	}

	async create () {
		return new New(await api.post('/new', this))
	}

	async update () {
		return new New(await api.put('/new', this))
	}

	async save () {
		return this.id === undefined ?
			await this.create()
		:	await this.update()
	}
}
