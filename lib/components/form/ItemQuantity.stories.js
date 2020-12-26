import ItemQuantity from './ItemQuantity'

export default {
  component: ItemQuantity,
  title: 'Form elements / Item quantity'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwItemQuantity v-model="value" :label="label" />'
})

export const Default = Template.bind({})
export const WithLabel = Template.bind({})

Default.args = {
  value: 0,
  label: ''
}

WithLabel.args = {
  value: 0,
  label: 'Select your quantity'
}
