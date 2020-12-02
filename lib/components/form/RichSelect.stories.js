import config from '../../../lib/utils/config'
import Select from './Select'

const variants = Object.keys(config().Select.variants)

const stringOptions = ['Option 1', 'Option 2', 'Option 3']

export default {
  component: Select,
  title: 'Form components / Rich Select',
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
  template: '<DwRichSelect v-model="value" name="input-text" :placeholder="placeholder" :variant="variant" :options="options" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" />'
})

export const Simple = Template.bind({})

Simple.args = {
  variant: variants[0],
  value: 'Option 1',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  options: stringOptions,
  placeholder: ''
}
