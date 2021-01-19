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

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputGroupCheckbox v-model="value" ref="input" :label="label" name="radio" :required="required"><DwInputCheckbox value="checkbox-1" label="Checkbox 1" /><DwInputCheckbox value="checkbox-2" label="Checkbox 2" /></DwInputGroupCheckbox><br><DwButton @click.native="$refs.input.validate()">Submit</DwButton></div>'
})

export const Simple = Template.bind({})
export const WithValidation = TemplateValidation.bind({})

Simple.args = {
  value: '',
  label: 'Label of checkbox',
  required: false
}

WithValidation.args = {
  ...Simple.args,
  value: false,
  required: true
}
