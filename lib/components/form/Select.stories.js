import config from '../../../lib/utils/config'
import Select from './Select'

const variants = Object.keys(config().Select.variants)

const stringOptions = ['Option 1', 'Option 2', 'Option 3']

export default {
  component: Select,
  title: 'Forms / Select',
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
    },
    options: {
      control: {
        type: 'select',
        options: ['Option 1', 'Option 2', 'Option 3']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div>{{ value }} <DwSelect v-model="value" name="input-text" :placeholder="placeholder" :variant="variant" :options="options" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" /></div>'
})

export const Simple = Template.bind({})
export const WithPlaceholder = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithError = Template.bind({})

Simple.args = {
  variant: variants[0],
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  options: stringOptions,
  placeholder: ''
}

WithPlaceholder.args = {
  ...Simple.args,
  placeholder: 'Custom placeholder'
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
