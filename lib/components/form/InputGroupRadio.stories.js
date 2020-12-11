import InputGroupRadio from './InputRadio'

export default {
  component: InputGroupRadio,
  title: 'Form elements / Input Group Radio'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwInputGroupRadio :label="label" name="radio" :required="required"><DwInputRadio value="radio-1" label="Radio 1" /><DwInputRadio value="radio-2" label="Radio 2" /></DwInputGroupRadio>'
})

export const Simple = Template.bind({})
export const Required = Template.bind({})

Simple.args = {
  value: '',
  label: 'Label of radio',
  required: false
}

Required.args = {
  ...Simple.args,
  required: true
}
