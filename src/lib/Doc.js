import BaseModel from '@/lib/BaseModel'
import api from '@/api'
import moment from 'moment'

export default class Doc extends BaseModel {
	baseUrl = 'http://api.dm-sport.pew-pc.com/file/{id}'
	sizes = [
		'КБ',
		'МБ',
		'ГБ',
		'ТБ',
		'ПБ',
		'ЭБ',
		'ЗБ',
		'ИБ'
	]

	constructor (arg) {
		super({
			title: '',
			file: '',
			...arg
		})
	}

	static async getList (params) {
		let res = await api.get('docs', params)
		if (Array.isArray(res))
			res = res.map(el => new Doc(el))

		return res || []
	}

	static async getOne (id) {
		return new Doc(await api.get('doc', { id }))
	}

	static async delete (id) {
		return new Doc(await api.delete('doc', { id }))
	}

	async create () {
		let fd = new FormData()

		let data = {
			...this,
			file: this.file,//await this.fileBase64,
			name: this.file.name,
			mime: this.file.type,
			size: this.file.size,
			updated_at: moment(this.file.lastModifiedDate).format('YYYY-MM-DD hh:mm:ss')
		}

		Object.keys(data).forEach(key => fd.append(key, data[key]))

		return new Doc(
			await api.post('doc', fd)
		)
	}

	async save () {
		return await this.create()
	}


	get fileBase64 () {
		let reader = new FileReader()

		return new Promise(resolve => {
			reader.onloadend = () => resolve(reader.result)
			reader.readAsDataURL(this.file)
		})
	}

	get isImage () {
		return ['image/png', 'image/jpeg', 'image/svg+xml'].includes(this.mime)
	}

	get sizeString () {
		const getSize = (size, i = 0) => {
			let res = size / (2 ** 10)
			return res > 2 ** 10 ? getSize(res, ++i) : { res, i }
		}

		let size = getSize(this.size)

		return `${size.res.toFixed(2)} ${this.sizes[size.i]}`
	}
}
