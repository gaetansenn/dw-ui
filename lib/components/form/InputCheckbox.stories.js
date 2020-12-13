import config from '../../../lib/utils/config'
import InputCheckbox from './InputCheckbox'

const variants = Object.keys(config().Input.variants)

export default {
  component: InputCheckbox,
  title: 'Form elements / Input Checkbox',
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
  template: '{{ value }}<DwInputCheckbox v-model="value" name="input-text" :variant="variant" :size="size" :required="required" :placeholder="placeholder" />'
})

export const Simple = Template.bind({})

Simple.args = {
  value: '',
  variant: variants[0],
  placeholder: 'Type your text here',
  required: false
}
