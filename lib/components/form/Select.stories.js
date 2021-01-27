import config from '../../../lib/utils/config'
import Select from './Select'

const variants = Object.keys(config().Select.variants)

const stringOptions = ['Option 1', 'Option 2', 'Option 3']
const objectOptions = [{ id: 'option-1', label: stringOptions[0] }, { id: 'option-2', label: stringOptions[1], disabled: true }, { id: 'option-3', label: stringOptions[2] }]

export default {
  component: Select,
  title: 'Form elements / Select',
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
    rounded: {
      control: {
        type: 'select',
        // TODO: Import it from global rounded prop
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'full']
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div><DwSelect v-model="value" name="input-text" :rounded="rounded" :placeholder="placeholder" :variant="variant" :options="options" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation" :value-key="valueKey" /><div class="mt-5">Selected : {{ value }}</div></div>'
})

const ArrowSlot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<DwSelect v-model="value" name="input-text" :rounded="rounded" :placeholder="placeholder" :variant="variant" :options="options" :label="label" :size="size" :required="required" :inline="inline" :help="help" :validation="validation"><svg slot="arrow" class="h-5 w-5 text-gray-800" x-description="Heroicon name: selector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></DwSelect>'
})

export const Simple = Template.bind({})
export const ObjectOptions = Template.bind({})
export const WithPlaceholder = Template.bind({})
export const WithLabel = Template.bind({})
export const Required = Template.bind({})
export const WithHelp = Template.bind({})
export const WithError = Template.bind({})
export const WithArrowSlot = ArrowSlot.bind({})

Simple.args = {
  variant: variants[0],
  value: '',
  label: '',
  required: false,
  inline: false,
  help: '',
  validation: undefined,
  valueKey: undefined,
  options: stringOptions,
  placeholder: ''
}

ObjectOptions.args = {
  ...Simple.args,
  options: objectOptions,
  valueKey: 'id'
}

WithArrowSlot.args = {
  ...Simple.args
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
