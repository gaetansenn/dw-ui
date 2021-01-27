import config from '../../../lib/utils/config'
import Select from './Select'

const variants = Object.keys(config().Select.variants)

const stringOptions = ['Option 1', 'Option 2', 'Option 3']
const objectOptions = [{ id: 'option-1', label: stringOptions[0] }, { id: 'option-2', label: stringOptions[1], disabled: true }, { id: 'option-3', label: stringOptions[2] }]

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
  template: '<div><DwRichSelect v-model="value" name="input-text" :placeholder="placeholder" :variant="variant" :options="options" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :value-key="valueKey" /><div class="mt-5">Select {{ value }}</div></div>'
})

export const Simple = Template.bind({})
export const ObjectOptions = Template.bind({})

Simple.args = {
  variant: variants[0],
  value: 'Option 1',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  options: stringOptions,
  valueKey: undefined,
  placeholder: ''
}

ObjectOptions.args = {
  ...Simple.args,
  value: objectOptions[0].id,
  options: objectOptions,
  valueKey: 'id'
}
