import Toggle from './Toggle'

export default {
  component: Toggle,
  title: 'Form components / Toggle'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwToggle v-model="value" value="checked" />'
})

export const Default = Template.bind({})

Default.args = {
  value: 'checked'
}
