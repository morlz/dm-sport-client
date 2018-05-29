import moment from 'moment'

export default ({ Vue }) => {
	moment.locale('ru')
	Vue.prototype.$moment = moment
}
