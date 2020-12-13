import InputGroupCheckbox from './InputGroupCheckbox'
import InputCheckbox from './InputCheckbox'

export default {
  component: InputGroupCheckbox,
  subcomponents: { InputCheckbox },
  title: 'Form elements / Input Group Checkbox'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwInputGroupCheckbox v-model="value" :label="label" name="radio" :required="required"><DwInputCheckbox value="checkbox-1" label="Checkbox 1" /><DwInputCheckbox value="checkbox-2" label="Checkbox 2" /></DwInputGroupCheckbox>'
})

export const Simple = Template.bind({})
export const Required = Template.bind({})

Simple.args = {
  value: '',
  label: 'Label of checkbox',
  required: false
}

Required.args = {
  ...Simple.args,
  required: true
}
