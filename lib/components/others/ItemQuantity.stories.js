import ItemQuantity from './ItemQuantity'

export default {
  component: ItemQuantity,
  title: 'Others / Item quantity'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwItemQuantity v-model="value" />'
})

export const Default = Template.bind({})

Default.args = {
  value: 0
}
