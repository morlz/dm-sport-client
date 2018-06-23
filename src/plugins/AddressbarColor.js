import { AddressbarColor, colors } from 'quasar'

export default () => {
	const primaryColor = '#390668'
	AddressbarColor.set(primaryColor)
	colors.setBrand('primary', primaryColor)
}
