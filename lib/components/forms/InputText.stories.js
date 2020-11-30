import config from '../../../lib/utils/config'
import InputText from './InputText'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputText,
  title: 'Forms / DwInputText',
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
  template: '<DwInputText v-model="value" name="input-text" :variant="variant" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" />'
})

export const Simple = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithError = Template.bind({})

Simple.args = {
  variant: variants[0]
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

WithError.args = {
  ...Simple.args,
  validation: {
    type: 'error',
    description: 'Lorem ipsum dolor sit amet'
  }
}
