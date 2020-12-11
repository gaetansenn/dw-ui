import config from '../../../lib/utils/config'
import InputEmail from './InputEmail'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputEmail,
  title: 'Form elements / Input Email',
  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    },
    variant: {
      control: {
        type: 'select',
        options: variants
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwInputEmail v-model="value" name="input-text" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :placeholder="placeholder" />'
})

const TemplateValidation = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwInputEmail v-model="value" ref="input" name="input-text" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" /><br><DwButton @click.native="$refs.input.validate()">Submit</DwButton></div>'
})

export const Simple = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithValidation = TemplateValidation.bind({})

Simple.args = {
  variant: variants[0],
  placeholder: 'Type your text here',
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined
}

WithLabel.args = {
  ...Simple.args,
  label: 'Input text'
}

Required.args = {
  ...WithLabel.args,
  required: true
}

WithHelp.args = {
  ...Simple.args,
  help: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec massa eros.'
}

WithValidation.args = {
  ...Simple.args
}
