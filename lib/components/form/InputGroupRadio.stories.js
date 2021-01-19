import InputGroupRadio from './InputRadio'

export default {
  component: InputGroupRadio,
  title: 'Form elements / Input Group Radio'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwInputGroupRadio v-model="value" :label="label" name="radio" :required="required"><DwInputRadio value="radio-1" label="Radio 1" :disabled="disabled" /><DwInputRadio value="radio-2" label="Radio 2" /></DwInputGroupRadio>'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputGroupRadio v-model="value" :label="label" ref="input" name="radio" :required="required"><DwInputRadio value="radio-1" label="Radio 1" :disabled="disabled" /><DwInputRadio value="radio-2" label="Radio 2" /></DwInputGroupRadio><br><DwButton @click.native="$refs.input.validate()">Submit</DwButton></div>'
})

export const Simple = Template.bind({})
export const Disabled = Template.bind({})
export const WithValidation = TemplateValidation.bind({})

Simple.args = {
  value: '',
  label: 'Label of radio',
  required: false,
  disabled: false
}

Disabled.args = {
  ...Simple.args,
  disabled: true
}

WithValidation.args = {
  ...Simple.args,
  value: false,
  required: true
}
